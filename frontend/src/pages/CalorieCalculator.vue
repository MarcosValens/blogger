<template>
    <q-page>
        <h3>Calculadora de calorias</h3>
        <div class="card">
        <q-card square bordered class="shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <div id="gender" class="q-gutter-sm">
                <h5>Indica tu sexo</h5>
                  <q-radio v-model="sexo" val="Hombre" label="Hombre" />
                  <q-radio v-model="sexo" val="Mujer" label="Mujer" />
              </div>  
              <div class="q-gutter-sm">
                Peso<q-input v-model.number="peso" type="number" placeholder="Kilos en kg" filled style="max-width: 200px"/>
                Altura<q-input v-model.number="altura" type="number" placeholder="Altura en cm" filled style="max-width: 200px"/>
                Edad <q-input v-model.number="edad" type="number" placeholder="Edad en años" filled style="max-width: 200px"/>
              </div>
              <div>
                <h5>Selecciona el ejercicio que realizas semanalmente.</h5>
                  <div id="pocoEjercicioDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/pocoEjercicio.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="pocoEjercicio">
                  </div>
                  <div id="ejercicioLigeroDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioLigero.png" :draggable="draggable" @dragstart="drag" @dragover.stop  id="ejercicioLigero">
                  </div>
                  <div id="ejercicioModeradoDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioModerado.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioModerado">
                  </div>
                  <div id="ejercicioFuerteDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioFuerte.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioFuerte">
                  </div>
                  <div id="ejercicioExtremoDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../statics/img/ejercicioExtremo.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioExtremo">
                  </div>
              </div>
              <div id="selectedExercise" @drop.capture="drop"  @dragover.capture="allowDrop">           
              </div>
            </q-form>
            <q-card-actions>
              <q-btn color="blue" size="lg" class="full-width" label="Submit" @click="calculateTMB" />
               <h3 id="caloriasNecesarias" style="display: none">Tus calorías necesarías son las siguientes: </h3>
            </q-card-actions>
          </q-card-section>
        </q-card>
        <q-card>
          <h5>Registro de alimentos</h5>
          <h4> Los alimentos ya añadidos son los siguientes:</h4>
          <div id="taula"></div>
          <q-btn color="blue" size="lg" label="Conseguir Calorias" @click="getAliments"/>
        </q-card>
        </div>
    </q-page>
</template>

<style scoped>
#selectedExercise{
    border: 1px solid #1976D2;
    width: 121px;
    height: 61px;
    margin-top: 7%;
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
