<template>
    <q-page>
        <h3>Calculadora de calorias</h3>
        <div class="card">
        <q-card square bordered class="shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <div class="q-gutter-sm">
                <h5>Indica tu sexo</h5>
                  <q-radio v-model="sexo" val="Hombre" label="Hombre" />
                  <q-radio v-model="sexo" val="Mujer" label="Mujer" />
              </div>  
              <div class="q-gutter-sm">
                Kilos<q-input v-model.number="kilos" type="number" placeholder="Kilos en kg" filled style="max-width: 200px" />
                Altura<q-input v-model.number="altura" type="number" placeholder="Altura en cm" filled style="max-width: 200px"/>
                Edad <q-input v-model.number="edad" type="number" placeholder="Edad en años" filled style="max-width: 200px" />
              </div>
              <div>
                <h5>Selecciona el ejercicio que realizas semanalmente.</h5>
                  <div id="pocoEjercicioDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../img/pocoEjercicio.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="pocoEjercicio">
                  </div>
                  <div id="ejercicioLigeroDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../img/ejercicioLigero.png" :draggable="draggable" @dragstart="drag" @dragover.stop  id="ejercicioLigero">
                  </div>
                  <div id="ejercicioModeradoDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../img/ejercicioModerado.png" :draggable="draggable" @dragstart="drag" @dragover.stop
                    id="ejercicioModerado">
                  </div>
                  <div id="ejercicioFuerteDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../img/ejercicioFuerte.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioFuerte">
                  </div>
                  <div id="ejercicioExtremoDiv" @drop.prevent="drop"  @dragover.prevent="allowDrop">
                    <img src="../img/ejercicioExtremo.png" :draggable="draggable" @dragstart="drag" @dragover.stop id="ejercicioExtremo">
                  </div>
              </div>
              <div id="selectedExercise" @drop.capture="drop"  @dragover.capture="allowDrop" class="col-4">           
              </div>
            </q-form>
          
            <q-card-actions>
              <q-btn color="blue" size="lg" class="full-width" label="Submit" @click="send" />
            </q-card-actions>
          </q-card-section>
        </q-card>
        </div>
    </q-page>
</template>

<style scoped>
#selectedExercise{
    border: 1px solid #4A7C59;
    width: 126px;
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
      kilos:false
    }
  },
  methods:{
    allowDrop: ev => {
      ev.preventDefault();
    },
    drag: ev =>{
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop: ev => {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");
      if (document.getElementById("selectedExercise").childElementCount == 0) {
          ev.target.appendChild(document.getElementById(data));
      } else {
        insertAfter(document.getElementById(data), document.getElementById("selectedExercise").lastChild);
        document.getElementById(document.getElementById("selectedExercise").firstChild.nextSibling.id + "Div").innerHTML = document.getElementById("selectedExercise").firstChild.nextSibling.outerHTML;
        document.getElementById("selectedExercise").firstChild.nextSibling.remove();
      }
    },
    insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    send(){
      console.log("Enviado")
    }
  }
}

</script>
