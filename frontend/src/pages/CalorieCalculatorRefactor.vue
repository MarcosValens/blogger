<template>
  <q-page>
    <h3 id="title">Calculadora de calorias</h3>
    <div class="row justify-center">
      <q-card square bordered class="my-card">
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
            <q-input v-model.number="peso" type="number" placeholder="Peso en kg" filled />
            <div class="text-h6" id="subTitleForm">Altura</div>
            <q-input v-model.number="altura" type="number" placeholder="Altura en cm" filled />
            <div class="text-h6" id="subTitleForm">Edad</div>
            <q-input v-model.number="edad" type="number" placeholder="Edad en años" filled />
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Selecciona el ejercicio que realizas semanalmente.</div>
            <q-separator inset />
            <div
              v-for="(ejercicio, index) in ejercicios"
              :key="index"
              @drop.prevent="drop"
              @dragover.prevent="allowDrop"
            >
              <img
                :src="ejercicio.image"
                :draggable="draggable"
                @dragstart="drag"
                @dragover.stop
                :id="ejercicio.id"
                :data-increment="ejercicio.increment"
              />
            </div>

            <div id="selectedExercise" @drop.capture="drop" @dragover.capture="allowDrop">
              <img v-if="ejercicioSeleccionado" :src="ejercicioSeleccionado.img" alt="Ejercicio" />
            </div>
          </q-card-section>
          <q-card-section v-if="tmb && caloriesNeeded">
            <h3>Tus calorías necesarías son las siguientes: {{ caloriesNeeded }}</h3>
          </q-card-section>
          <q-card-actions>
            <q-btn color="blue" label="Calcular Calorias" @click="calculateTMB" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
#title {
  text-align: center;
  color: #1976d2;
}
.my-card {
  width: 100%;
  max-width: 400px;
  margin-left: 5%;
}
#selectedExercise {
  border: 1px solid #1976d2;
  width: 121px;
  height: 61px;
  margin-top: 7%;
}

#subTitleForm,
#pocoEjercicioDiv {
  margin: 3% 0%;
}
</style>

<script>
import * as ml5 from "ml5";
import * as p5 from "p5";

const generos = {
  Hombre: 5,
  Mujer: -161
};

export default {
  name: "CalorieCalculatorRefactor",
  props: ["draggable"],
  data() {
    return {
      sexo: 0,
      altura: false,
      edad: false,
      peso: false,
      ejercicio: 0,
      tmb: null,
      caloriesNeeded: null,
      ejercicioSeleccionado: null,
      ejercicios: [
        {
          image: "../statics/img/pocoEjercicio.png",
          id: "pocoEjercicioDiv",
          increment: 1.2
        },
        {
          image: "../statics/img/ejercicioLigero.png",
          id: "ejercicioLigeroDiv",
          increment: 1.375
        },
        {
          image: "../statics/img/ejercicioModerado.png",
          id: "ejercicioModeradoDiv",
          increment: 1.55
        },
        {
          image: "../statics/img/ejercicioFuerte.png",
          id: "ejercicioFuerteDiv",
          increment: 1.725
        },
        {
          image: "../statics/img/ejercicioExtremo.png",
          id: "ejercicioExtremoDiv",
          increment: 1.9
        }
      ]
    };
  },
  methods: {
    getTmb(increment) {
      return 10 * this.peso + 6.25 * this.altura - 5 * this.edad + increment;
    },
    calculateTMB: function() {
      if (!this.isValid()) {
        return alert("Por favor, revise sus valores");
      }
      this.tmb = this.getTmb(generos[this.sexo]);
      this.caloriesNeeded = this.tmb * this.ejercicioSeleccionado.increment;
    },
    allowDrop: function(ev) {
      ev.preventDefault();
    },
    drag: function(ev) {
      const dataSet = ev.target.dataset;
      const img = ev.target.src;
      ev.dataTransfer.setData(
        "text",
        JSON.stringify({ increment: dataSet.increment, img })
      );
    },
    drop: function(ev) {
      ev.preventDefault();
      const { increment, img } = JSON.parse(ev.dataTransfer.getData("text"));
      this.ejercicioSeleccionado = { increment, img };
    },
    send() {
      console.log("Enviado");
    },
    isValid() {
      return (
        this.sexo &&
        this.edad &&
        this.altura &&
        this.peso &&
        this.ejercicioSeleccionado
      );
    }
  }
};
</script>
