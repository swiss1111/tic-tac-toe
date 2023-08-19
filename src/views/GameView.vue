<script lang="ts">
import {boardStringify, getWinner} from '@/utils/gameUtils'
import axios from "axios";

export default {
  data() {
    return {
      table: [],
      size: 3,
      currentPlayer: 1,
      winner: undefined ,
    }
  },
  methods: {
    changePlayer() {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
    },

    createTable() {
      const tableData: number[][] = []

      for (let i = 0; i < this.size; i++) {
        const row: number[] = []
        for (let j = 0; j < this.size; j++) {
          row.push(0)
        }
        tableData.push(row)
      }

      this.table = tableData
    },

    renderText(value): string {
      if (value === 1) {
        return 'x'
      } else if (value === 2) {
        return 'O'
      }
      return ''
    },

    onClick(colIndex, rowIndex) {
      if (this.table[colIndex][rowIndex] !== 0) {
        return
      }
      this.table[colIndex][rowIndex] = this.currentPlayer

      const winner = getWinner(this.table, this.size);

      if (!winner) {
        this.changePlayer()
        return
      }

      this.setWinner(winner);
    },

    setWinner(winner: number) {
      this.winner = winner;
      switch (winner) {
        case 1:
          alert("Winner: x");
          break;
        case 2:
          alert("Winner: O");
          break;
        case 3:
          alert("Draw");
          break;
      }
    },

    onReset() {
      this.createTable()
      this.currentPlayer = 1
    },

    onSave() {
      let name = prompt("Save as");

      axios.post("http://localhost:5000/boards", {
        board: boardStringify(this.table, this.size),
        name: name,
      })
    },

    onSizeChange(size) {
      this.size = size
      this.onReset()
    }
  },
  computed: {
    getTable(): number[][] {
      return this.table
    }
  },
  async mounted() {
    console.log("mounted", this.$route.params);
    if (this.$route?.params?.id) {
      let resp = await axios.get("http://localhost:5000/boards/" + this.$route?.params?.id);
      console.log("mounted data", resp.data);
    }

    this.createTable()
  }
}
</script>

<template>
  <div class="table-wrapper">
    <div class="controllers">
      <button class="controllers-button" v-on:click="onReset()">Reset</button>
      <button class="controllers-button" v-on:click="onSave()">Save</button>
      <button class="controllers-button" v-on:click="onSizeChange(3)" v-if="size !== 3">3x3</button>
      <button class="controllers-button" v-on:click="onSizeChange(4)" v-if="size !== 4">4x4</button>
      <button class="controllers-button" v-on:click="onSizeChange(5)" v-if="size !== 5">5x5</button>
      <button class="controllers-button" v-on:click="onSizeChange(6)" v-if="size !== 6">6x6</button>
      <button class="controllers-button" v-on:click="onSizeChange(7)" v-if="size !== 7">7x7</button>
    </div>
    <div class="stretchy-wrapper">
      <div class="container">
        <table class="table">
          <div class="row" v-for="(col, colIndex) in getTable" :key="'col' + colIndex">
            <div class="cell" v-for="(item, rowIndex) in col" :key="'row' + rowIndex">
              <button class="table-button" v-on:click="onClick(colIndex, rowIndex)">
                {{ renderText(item)}}
              </button>
            </div>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controllers {
}

.controllers-button {
  background-color: transparent;
  margin: 0;
  padding: 10px 20px;
  border: 0;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  font-size: 15px;
}

.controllers-button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.table-wrapper {
  width: 50%;
  margin: 10px auto;
}

@media screen and (max-width: 812px) {
  .table-wrapper {
    width: 100%;
  }
}

.stretchy-wrapper {
  width: 100%;
  padding-bottom: 100%; /* 1:1 */
  position: relative;
}

.stretchy-wrapper > div.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  color: white;
  font-size: 24px;
  text-align: center;
}

.table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.row {
  flex: 1;
  display: flex;
  border-top: 1px solid hsla(160, 100%, 37%, 1);
  border-bottom: 1px solid hsla(160, 100%, 37%, 1);
}

.row:first-child {
  border-top: 0;
}

.row:last-child {
  border-bottom: 0;
}

.cell {
  flex: 1;
  border-left: 1px solid hsla(160, 100%, 37%, 1);
  border-right: 1px solid hsla(160, 100%, 37%, 1);
}

.cell:first-child {
  border-left: 0;
}

.cell:last-child {
  border-right: 0;
}

.table-button {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  color: #fff;
  background-color: transparent;
}
</style>
