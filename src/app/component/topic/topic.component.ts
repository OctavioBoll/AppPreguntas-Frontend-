import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { TopicServiceService } from 'src/app/service/topic-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'




@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  delete = faTrash
  faCoffee = faCoffee;
  listTopicSelect: any[] = []
  questions: any[] = []
  questionsDos: any[] = []
  topics = { count: 10, data: [] }
  countTopics = 0;
  contentCreateTopic = false;
  openAccordion = false;
  refQuest = [];

  closeResult = '';
  topicName = '';
  topicId = '';
  errorMessage = '';

  randomTitle = ''
  randomDescription = ''


  

  questName = '';
  questDescripcion = '';

  topicForm: FormGroup;
  questForm: FormGroup;

  //Declaracion de Form
  formTopic: FormGroup = new FormGroup({})

  loading = false;


  mostrar = "T";

  constructor(
    private _topicService: TopicServiceService,
    private modalService: NgbModal,
    public fbTopic: FormBuilder,
    public _cookieService: CookieService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.initFormTopic();
    //this.initFormTopic();
    //this.initFormQuestions();
    this.obtenerTopics();
  }



  //Form y arrayForms ultimo

  initFormTopic() {
    this.formTopic = this.fbTopic.group({
      _id: new FormControl(''),
      topic: new FormControl ('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      questions: new FormArray([])
    })
    this.addQuestion()

    
  }

  initFormQuestions(): FormGroup {
    return this.fbTopic.group({
      title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      descripcion:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]) 
    })
  }

  addQuestion() {
    this.quest.push(this.initFormQuestions())
  }

  get quest(): FormArray {
    return this.formTopic.get("questions") as FormArray
  }

  //se usa en el html 
  getCtrl(key, form: FormGroup) {
    return form.get(key)
  }






  //____________________________________________________________________//


  //----------------------------- TOPICS----------------------------------

  //Obtener Datos
  obtenerTopics() {
    this.loading = true
    this._topicService.getTopics().subscribe(data => {
      this.topics.data = data['topics']
      
      this.loading = false;
    },
      error => {
        this._snackBar.open("Error al obtener Topics:" + error, null,
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: "red-snack-bar"
          })
        this.loading = false;
      })
  }


  openCreateTopic(contentCreateTopic) {
    this.initFormTopic()
    this.openTemplate(contentCreateTopic)
  }

 // Guardar datos
  guardarTopic() {
    this.loading = true
    this.modalService.dismissAll()
    this._topicService.createTopic(this.formTopic.value).subscribe(data => {
      this.loading = false
      this.obtenerTopics()
    },
      error => {
        this._snackBar.open("Error al Crear un Topics:" + error, null,
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: "red-snack-bar"
          })
        this.loading = false;
      })
  }

  //Eliminar datos
  deleteTopic(topic) {
    this.loading = true
    this._topicService.deleteTopic(topic._id).subscribe(data => {
      this.loading = false
      this.obtenerTopics()
    },
      error => {
        this._snackBar.open("Error al Eliminar un Topics:" + error, null,
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: "red-snack-bar"
          })
        this.loading = false;
      })
  }

  //Editar Datos

  openTopic(topic) {
    this.listTopicSelect = []
    this.questions = []
    this.listTopicSelect.push(topic)
    for (let i = 0; i < this.listTopicSelect[0].questions.length; i++) {
      this.questions.push(this.listTopicSelect[0].questions[i])
    }
    this.mostrar = "Q"
  }


  //------------------------------------ Preguntas ----------------------


  //_________________________ Funciones con formTopic _______________________________________


  openCreateQuest(contentCreateQuestions) {
    this.formTopic = this.fbTopic.group({
      topic: this.formTopic.value.topic,
      questions: new FormArray([
        this.fbTopic.group({
          title: ['', [Validators.required,Validators.minLength(1), Validators.maxLength(30)]],
          descripcion: ['', [Validators.required,Validators.minLength(1), Validators.maxLength(300)]]
        })
      ])
    })


    if (this.quest.length == 0) {
      this.addQuestion();
    }
    this.openTemplate(contentCreateQuestions)
  }

  agregarPregunta() {
    const quest = this.formTopic.controls.questions as FormArray;

    this.questions.push(quest.value[0])
    

    this.formTopic = this.fbTopic.group({
      user_id: this.listTopicSelect[0].user_id,
      _id: this.listTopicSelect[0]._id,
      topic: this.listTopicSelect[0].topic,
      questions: [this.questions]
    })

    this.updateTopic("agrego")
    
  }


  updateTopic(text) {
    this.loading = true

    this._topicService.updateTopic(this.formTopic.value).subscribe(data => {

      
      this.modalService.dismissAll();
      
      this.obtenerTopics()
      this.volverTopics()
      
      this.loading = false
      
      this._snackBar.open("Se "+ text + " pregunta en: " + "'" + this.formTopic.value.topic + "'", null,
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: "green-snack-bar"
        })

    },
      error => {
        this._snackBar.open("Error al Actualizar un Pregunta:" + error, null,
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: "red-snack-bar"
          })
        this.loading = false;
      })



  }

  eliminarQuestion(item) {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i]._id == item._id && typeof item._id !== "undefined") {
        this.questions.splice(i, 1)
      }
    }


    this.formTopic = this.fbTopic.group({
      user_id: this.listTopicSelect[0].user_id,
      _id: this.listTopicSelect[0]._id,
      topic: this.listTopicSelect[0].topic,
      questions: [this.questions]
    })

    this.updateTopic("elimino")
    this.obtenerTopics()
    this.openTopic(this.formTopic.value)
  }


  editarPregunta() {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i]._id == this.formTopic.value.questions[0]._id) {
        this.questions.splice(i, 1)
        this.questions.push(this.formTopic.value.questions[0])
      }
    }
    this.formTopic = this.fbTopic.group({
      _id: this.listTopicSelect[0]._id,
      topic: this.listTopicSelect[0].topic,
      questions: [this.questions]
    })

    this.updateTopic("edito")
  }

  openEditQuest(contentUpdateQuestions, item) {
    this.formTopic = this.fbTopic.group({
      topic: this.listTopicSelect[0].topic,
      questions: new FormArray([
        this.fbTopic.group({
          _id: item._id,
          title: [item.title,Validators.required],
          descripcion: [item.descripcion,Validators.required]
        })
      ])
    })

    this.openTemplate(contentUpdateQuestions)
  }


  //_______________________________ Funciones con topicForm ____________________________________________

  /** 
    agregarPregunta(){
  
      const quest = this.topicForm.controls.questions as FormArray;
      
      this.questions.push(quest.value)
  
      this.topicForm = this.fbTopic.group({
        user_id:this.listTopicSelect[0].user_id,
        _id:this.listTopicSelect[0]._id,
        topic:this.listTopicSelect[0].topic,
        questions:[this.questions]
      })
      this.updateTopic()
    }
  
  
    updateTopic(){
      this.loading = true
      this._topicService.updateTopic(this.topicForm.value).subscribe(data =>{
        this.loading = false
        this.modalService.dismissAll()
        this.obtenerTopics()
        
      },
      error => {
        this._snackBar.open("Error al Actualizar un Pregunta:" + error ,null,
            {
              duration:5000,
              horizontalPosition:'center',
              verticalPosition:'top',
              panelClass: "red-snack-bar"
            })
            this.loading = false;
          })
    }
  
    
    
  
    editarPregunta(){
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i]._id == this.questForm.value._id) {
          this.questions.splice(i,1)
          this.questions.push(this.questForm.value)
          
        }
      }
  
      this.topicForm = this.fbTopic.group({
        user_id:this.listTopicSelect[0].user_id,
        _id:this.listTopicSelect[0]._id,
        topic:this.listTopicSelect[0].topic,
        questions:[this.questions]
      })
  
      this.updateTopic()
    }
  
    
  
    openEditQuest(contentUpdateQuestions,item){
      this.questForm.setValue({
        _id:item._id,
        title:item.title,
        descripcion:item.descripcion
      })
      this.openTemplate(contentUpdateQuestions)
    }
  
    
    
  
    
  
    eliminarQuestion(item){
      
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i]._id == item._id) {
          
          this.questions.splice(i,1)
        }
      }
      this.topicForm = this.fbTopic.group({
        user_id:this.listTopicSelect[0].user_id,
        _id:this.listTopicSelect[0]._id,
        topic:this.listTopicSelect[0].topic,
        questions:[this.questions]
      })
  
  
      this.updateTopic()
      this.obtenerTopics()
      this.openTopic(item)
    }
    */

  volverTopics() {
    this.mostrar = "T"

  }

  random(contentUpdateQuestions) {
    const cantElementos = this.questions.length
    const indiceAleatorio = Math.floor(Math.random() * cantElementos)
    this.randomTitle = this.questions[indiceAleatorio].title
    this.randomDescription = this.questions[indiceAleatorio].descripcion

    if (!this.questions.length) {

    }
    this.openTemplate(contentUpdateQuestions)
  }

  openQuest() {
    this.openAccordion = !this.openAccordion
  }



  //open Content template
  openTemplate(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
