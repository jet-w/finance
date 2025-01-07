<template>
  <div class="container">
    <div class="left">
      <h3>Original Content</h3>
      <textarea v-model="inputContent" rows="10" cols="30" placeholder="Enter your content here"></textarea>
    </div>
    <div class="right">
      <h3>Result</h3>
      <div v-for="(line, index) in resultContent" :key="index">
        {{ line }}
      </div>
      <h3>Mermaid Preview</h3>
      <!-- Mermaid graph preview -->
      <div class="mermaid" ref="mermaidPreview">
        {{ mermaidCode }}
      </div>
    </div>
  </div>
</template>

<script>
// Import mermaid
import mermaid from 'mermaid';

export default {
  data() {
    return {
      inputContent: `
graph LR
    王东 ---> 重疾
    王东 ---> 住院报销
    王东 --> 意外
    王东 ---> 养老
    重疾 ---> 吉祥至尊两全（新华）保额10万
    重疾 ---> 健康无忧（新华）保额30万
    住院报销 ---> 康健华尊（新华）
    住院报销 ---> 吉祥至尊（新华）
    意外 ---> 安心百分百
    意外 ---> 百万任我行
      `,
      resultContent: [],
      mermaidCode: ''
    };
  },
  watch: {
    inputContent(newContent) {
      this.resultContent = this.convert(newContent);
      this.mermaidCode = this.convertToMermaid(newContent);
      this.renderMermaid();
    }
  },
  methods: {
    // Main convert function
    convert(content) {
      const lines = content.trim().split('\n');
      const code = this.generateLetterCode();
      const codeItem = {};
      const rc = [];

      for (const line of lines) {
        const items = this.getItems(line);
        for (const item of items) {
          if (!codeItem.hasOwnProperty(item)) {
            codeItem[item] = code.next().value;
          }
        }
        if (items.length === 2) {
          rc.push(
            `${this.getLstrip(line)} ${codeItem[items[0]]}[${items[0]}] ${this.getSplit(line)[0]} ${codeItem[items[1]]}[${items[1]}]`
          );
        } else {
          rc.push(line);
        }
      }

      return rc;
    },

    // Convert to mermaid graph syntax
    convertToMermaid(content) {
      const lines = content.trim().split('\n');
      let mermaidString = '';//'graph LR\n';

      for (const line of lines) {
        const items = this.getItems(line);
        if (items.length === 2) {
          mermaidString += `    ${items[0]} ---> ${items[1]}\n`;
        }else{
          mermaidString += `${items[0]}\n`;
        }
      }

      return mermaidString;
    },

    // Generate letter codes
    *generateLetterCode() {
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      let length = 1;

      while (true) {
        const combinations = this.getCombinations(letters, length);
        for (const combination of combinations) {
          yield combination;
        }
        length++;
      }
    },

    getCombinations(chars, length) {
      if (length === 1) return chars.split('');
      const prevCombinations = this.getCombinations(chars, length - 1);
      const combinations = [];

      for (const char of chars) {
        for (const combination of prevCombinations) {
          combinations.push(char + combination);
        }
      }
      return combinations;
    },

    getLstrip(str) {
      return str.slice(0, str.length - str.trimStart().length);
    },

    getSplit(lineString) {
      const pattern = /([-]{2,}>)/g;
      return [...lineString.matchAll(pattern)].map(match => match[0]);
    },

    getItems(lineString) {
      return lineString.split(/[-]{2,}>/).map(item => item.trim());
    },

    // Render mermaid chart using the Mermaid library
    renderMermaid() {
      // Ensure Mermaid content is loaded and rendered
      mermaid.initialize({ startOnLoad: true });
      // This will trigger Mermaid to process the element and render the graph
      this.$nextTick(() => {
        mermaid.contentLoaded();
      });
    }
  },
  mounted() {
    this.renderMermaid();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left,
.right {
  width: 45%;
}

textarea {
  width: 100%;
  height: 300px;
}

.right {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.mermaid {
  margin-top: 20px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  font-family: monospace;
}
</style>
