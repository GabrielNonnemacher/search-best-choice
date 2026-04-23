# 🧩 15-puzzle com A*

Este projeto implementa o algoritmo **A\*** para resolver o clássico problema do **15-puzzle**, utilizando a heurística da **distância de Manhattan** para otimizar a busca.

## 📌 Sobre o Problema

O 15-puzzle consiste em um tabuleiro 4x4 com 15 peças numeradas e um espaço vazio. O objetivo é reorganizar as peças até alcançar o estado final ordenado, realizando apenas movimentos válidos (cima, baixo, esquerda, direita).

O problema é modelado como um **grafo de estados**, onde:
- Cada estado do tabuleiro é um nó
- Cada movimento é uma transição

---

## ⚙️ Algoritmo Utilizado

### 🔹 A* (A-Star)

O algoritmo A* utiliza a função:

f(n) = g(n) + h(n)

Onde:
- `g(n)` → custo real (número de movimentos realizados)
- `h(n)` → heurística (distância de Manhattan)

### 🔹 Heurística

A heurística utilizada é a **distância de Manhattan**, que calcula a soma das distâncias de cada peça até sua posição final.

---

## 🚀 Como Executar

### ✔ Pré-requisitos
- Node.js instalado

### ✔ Executar

```bash
node searchBestChoice.js
