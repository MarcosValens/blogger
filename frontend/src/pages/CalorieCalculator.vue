<template>
  <q-page>
    <h3 id="title">Calculadora de calorias</h3>
    <div class="row justify-center">
      <q-card square bordered id="card-TMB">
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
            <div class="text-h6">Tus calorías necesarías son las siguientes: {{ caloriesNeeded }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn color="blue" label="Calcular Calorias" @click="calculateTMB" />
          </q-card-actions>
        </q-form>
      </q-card>
      <q-card square bordered id="card-registro-alimentos">
        <q-card-section>
          <div class="text-h5" id="subTitleForm">Registro de alimentos</div>
          <video id="video" width="370" height="240" autoplay></video>
          <div id="btnCalories">
            <q-btn color="blue" size="lg" label="Conseguir Calorias" @click="getAlimentsFromDb" />
          </div>
          <div class="text-h6" id="subTitleForm">Los alimentos ya añadidos son los siguientes:</div>
          <q-table
            v-if="aliments && aliments.length"
            :data="aliments"
            :columns="columns"
            row-key="name"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
#title {
  text-align: center;
  color: #1976d2;
}

#card-TMB {
  width: 100%;
  max-width: 400px;
  margin-left: 5%;
}

#card-registro-alimentos {
  width: 100%;
  max-width: 400px;
  max-height: 700px;
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
  margin-top: 3%;
}

#btnCalories,
#btnTMB {
  text-align: center;
}
</style>


<script>
import * as ml5 from "ml5";

const DB_NAME = "aliments";
const DB_VERSION = 1;
const DB_TABLE = "aliment";

const generos = {
  Hombre: 5,
  Mujer: -161
};

export default {
  name: "CalorieCalculator",
  props: ["draggable"],
  data() {
    return {
      sexo: 0,
      altura: false,
      edad: false,
      peso: false,
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
      ],
      db: null,
      aliments: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre del alimento",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Calorias",
          field: "calories",
          sortable: true
        }
      ],
      data: []
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
    isValid() {
      return (
        this.sexo &&
        this.edad &&
        this.altura &&
        this.peso &&
        this.ejercicioSeleccionado
      );
    },
    async addAlimentToDb(aliment) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([DB_TABLE], "readwrite");
        trans.oncomplete = e => {
          this.updateAliments(this.aliments);
          resolve();
        };
        trans.onerror = reject;
        let store = trans.objectStore(DB_TABLE);
        let request = store.put({
          name: aliment.label,
          calories: null
        });
      });
    },
    getAlimentsFromDb() {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([DB_TABLE], "readonly");
        let store = trans.objectStore(DB_TABLE);
        let aliments = [];

        trans.oncomplete = e => {
          resolve(aliments);
          this.aliments = aliments;
        };

        store.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor == null) {
            this.calculateCalories(aliments);
          } else if (cursor) {
            aliments.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },

    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = e => {
          reject("Error");
        };

        request.onsuccess = e => {
          resolve(e.target.result);
        };

        request.onupgradeneeded = e => {
          let active = e.target.result;
          let objectStore = active.createObjectStore(DB_TABLE, {
            keyPath: "name",
            autoIncrement: true
          });
          objectStore.createIndex("name", "name", {
            unique: true
          });
        };
      });
    },

    async getCalories(aliment) {
      if (aliment.calories) {
        return aliment;
      }
      const foodUrl = `https://api.edamam.com/api/food-database/parser?ingr=${aliment.name.toLowerCase()}&app_id=73c8bf64&app_key=${
        process.env.FOOD_API_KEY
      }`;
      let fetchCalorieAliment = fetch(foodUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          aliment.calories = myJson.parsed[0].food.nutrients.ENERC_KCAL;
        });
      return fetchCalorieAliment;
    },

    async calculateCalories(aliments) {
      let allAlimentPromises = aliments.map(this.getCalories);
      Promise.all(allAlimentPromises).then(e => {
        this.updateAliments(aliments);
      });
    },

    async updateAliments(aliments) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([DB_TABLE], "readwrite");
        trans.oncomplete = e => {
          resolve(aliments);
        };

        let store = trans.objectStore(DB_TABLE);
        store.openCursor().onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            aliments.forEach(aliment => {
              const updateData = cursor.value;
              if (
                updateData.name === aliment.name &&
                updateData.calories == null
              ) {
                updateData.calories = aliment.calories;
              }
            });
            cursor.continue();
          }
        };
      });
    }
  },
  async created() {
    //  IndexedDB
    this.$axios
      .get(`${process.env.JAVA_ENDPOINT}/all`)
      .then()
      .catch(error => {
        if (error.response.status === 401) {
          this.$router.push("/login");
        }
      });
    this.$axios.get;
    this.db = await this.getDb();
    this.aliments = await this.getAlimentsFromDb();
    this.ready = true;
  },

  mounted() {
    this.video = document.querySelector("#video");

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      video.srcObject = stream;
      video.play();
    });

    ml5
      .imageClassifier("/statics/modelo/model.json", video)
      .then(classifier => loop(classifier));

    const loop = classifier => {
      classifier.classify().then(async results => {
        const promises = results.map(result => {
          if (result.confidence > 0.99) {
            alert("Se ha reconocido el alimento.");
            return this.addAlimentToDb(result);
          }
        });
        await Promise.all(promises);
        loop(classifier);
      });
    };
  }
};
</script>
