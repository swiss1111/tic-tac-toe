<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      gameList: [],
      name: undefined,
    }
  },
  methods: {
    getTableList() {
      // let name = prompt("Get name");

      let name = "";

      axios.get("http://localhost:5000/boards?name=" + name).then( resp => {
        this.gameList = resp.data
      })
    },

    onLoad(id: number) {
      this.$router.push({name: "game", params: {id: id}})
    },

    onDelete(id: number) {
      axios.delete("http://localhost:5000/boards/" + id).then( resp => {
        const index = this.gameList.indexOf(item => {
          item.id = id;
        })

        this.gameList.splice(index, 1);
      })
    }
  },
  computed: {

  },
  mounted() {
    this.getTableList()
  }
}
</script>

<template>
  <div class="container">
    <div>

    </div>
    <div class="list">
      <div class="item" v-for="game in gameList" :key="game.id">
        <div class="title">
          {{game.name}}
        </div>
        <div class="buttons">
          <button class="controllers-button" v-on:click="onLoad(game.id)">Load</button>
          <button class="controllers-button" v-on:click="onDelete(game.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.item {
  display: flex;
}

.title {
  margin: 0;
  padding: 10px 20px;
  border: 0;
  font-size: 15px;
  color: #fff;
}

.controllers-button {
  background-color: transparent;
  margin: 0;
  padding: 10px 20px;
  border: 0;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  font-size: 16px;
}

.controllers-button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
