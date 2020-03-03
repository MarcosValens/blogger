<template>
    <q-page>
        <h3 id="title"> Calculadora de calorias</h3>
        <div class="row justify-center">
        <q-card square bordered class="my-card" >
            <q-form class="q-gutter-md">
              <q-card-section>
                <div class="text-h5">Indica tu sexo</div>
                <q-separator inset />
                <q-radio v-model="sexo" val="Hombre" label="Hombre" />
                <q-radio v-model="sexo" val="Mujer" label="Mujer" />
              </q-card-section>
              <q-card-section>
              <div class="text-h5">Indica tu peso, altura y edad</div>
                <q-separator inset />
                <div class="text-h6" id="subTitleForm">Peso</div>
                <q-input v-model.number="peso" type="number" placeholder="Peso en kg" filled/>
                <div class="text-h6" id="subTitleForm">Altura</div>
                <q-input v-model.number="altura" type="number" placeholder="Altura en cm" filled />
                <div class="text-h6" id="subTitleForm">Edad</div>
                <q-input v-model.number="edad" type="number" placeholder="Edad en años" filled />
              </q-card-section>
              <q-card-section>
                <div class="text-h5">Selecciona el ejercicio que realizas semanalmente.</div>
                <q-separator inset />
                  <div id="pocoEjercicioDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/pocoEjercicio.png" :draggable="draggable" @dragstart="drag" @dragover.stop  id="pocoEjercicio">
                  </div>
                  <div id="ejercicioLigeroDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioLigero.png" :draggable="draggable" @dragstart="drag" @dragover.stop  id="pocoEjercicio">
                  </div>
                  <div id="ejercicioModeradoDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioModerado.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioModerado">
                  </div>
                  <div id="ejercicioFuerteDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioFuerte.png" :draggable="draggable" @dragstart="drag" @dragover.stop  id="ejercicioFuerte">
                  </div>
                  <div id="ejercicioExtremoDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioExtremo.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioExtremo">
                  </div>
              <div id="selectedExercise" @drop.capture="drop"  @dragover.capture="allowDrop">           
              </div>
              </q-card-section>
              <q-card-actions>
              <q-btn color="blue" label="Calcular Calorias" @click="calculateTMB" />
               <h3 id="caloriasNecesarias" style="display: none">Tus calorías necesarías son las siguientes: </h3>
            </q-card-actions>
              </q-form>
        </q-card>
        <q-card square bordered class="my-card">
          <q-card-section>
          <h3>Registro de alimentos</h3>
          <h4> Los alimentos ya añadidos son los siguientes:</h4>
          <div id="taula"></div>
          <q-btn color="blue" size="lg" label="Conseguir Calorias" @click="getAliments"/>
          </q-card-section>
        </q-card>
        </div>
    </q-page>
</template>

<style scoped>

 #title{
    text-align: center;
    color: #1976D2; 
  }
  .my-card{
  width: 100%;
  max-width: 400px;
  margin-left: 5%;
  }
  #selectedExercise{
    border: 1px solid #1976D2;
    width: 121px;
    height: 61px;
    margin-top: 7%;
  }

  #subTitleForm, #pocoEjercicioDiv{
  margin: 3% 0%;
  }
</style>

<script>
import * as ml5 from 'ml5'
import * as p5 from 'p5'

export default {
  name: "CalorieCalculator",
  props: ['draggable'],
  data () {
    return {
      sexo: 'line',
      altura: false,
      edad:false,
      peso:false,
      ejercicio: "",
    }
  },
  methods:{
    calculateTMB: function() {
      let TMB;
      let caloriesNeeded;
      let exercici;

      if(this.sexo == false || this.edad == false || this.altura == false || this.peso == false){
       alert("Por favor, revise sus valores");
        return;
      }
      else if (document.getElementById("selectedExercise").children[0] == undefined) {
        alert("Indique el ejercicio que realiza por favor.");
      } else {
        exercici = document.getElementById("selectedExercise").children[0].id;
      }
      switch (this.sexo) {
        case "Hombre":
          TMB = (10 * this.peso) + (6.25 * this.altura) - (5 * this.edad) + 5;
          console.log(TMB)
          break;
        case "Mujer":
          TMB = (10 * this.peso) + (6.25 * this.altura) - (5 * this.edad) - 161;
          console.log(TMB)
          break;
      }

      switch (exercici) {
        case "pocoEjercicio":
            caloriesNeeded = (TMB * 1.2);
            break;
        case "ejercicioLigero":
            caloriesNeeded = TMB * 1.375;
            break;
        case "ejercicioModerado":
            caloriesNeeded = TMB * 1.55;
            break;
        case "ejercicioFuerte":
            caloriesNeeded = TMB * 1.725;
            break;
        case "ejercicioExtremo":
            caloriesNeeded = TMB * 1.9;
            break;
      }
      if (caloriesNeeded != undefined) {
        console.log(caloriesNeeded);
        document.querySelector("#caloriasNecesarias").style.display = 'unset';
        document.querySelector("#caloriasNecesarias").textContent += caloriesNeeded;
      }
    },
    allowDrop: function (ev) {
      ev.preventDefault();
    },
    drag: function (ev){
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop: function (ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");
      if (document.getElementById("selectedExercise").childElementCount == 0) {
          console.log(ev.target);
          ev.target.appendChild(document.getElementById(data));
      } else {
        this.insertAfter(document.getElementById(data), document.getElementById("selectedExercise").lastChild);
        document.getElementById(document.getElementById("selectedExercise").firstChild.nextSibling.id + "Div").innerHTML = document.getElementById("selectedExercise").firstChild.nextSibling.outerHTML;
        document.getElementById(document.getElementById("selectedExercise").firstChild.nextSibling.id+"Div").firstChild.setAttribute("draggable","draggable");
        document.getElementById(document.getElementById("selectedExercise").firstChild.nextSibling.id+"Div").firstChild.addEventListener("dragstart",this.drag);

        document.getElementById("selectedExercise").firstChild.nextSibling.remove();
      }
    },
    insertAfter: function (newNode, referenceNode) {
      console.log(newNode);
      console.log(referenceNode);
      referenceNode.parentNode.insertBefore(newNode, referenceNode);
    },
    send(){
      console.log("Enviado");
    },
    preload: function(){
      let video;
      const label = "esperando...";
      let classifier;
      classifier = ml5.imageClassifier("/statics/modelo/model.json");
    },
    setup: function() {
    createCanvas(640, 520);
    video = createCapture(VIDEO);
    video.hide();
    this.classifyVideo();
    },
    classifyVideo: async function() {
    classifier.classify(video, gotResults);
    },
    draw: function() {
    background(0);
    image(video, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height - 16);
  },
    gotResults: function(error, results) {
       if (error) {
          return;
        }
        if (results[0].confidence > 0.99) {
        label = results[0].label;
        addFruit(results[0]);
        }
        classifyVideo();
    },
    getAliments(){
      console.log("Alimentos ")
      }
    }
} 


</script>
