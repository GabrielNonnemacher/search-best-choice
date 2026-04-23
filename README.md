# 🧩 15-puzzle with A*

This project implements the **A* algorithm to solve the classic **15-puzzle** problem, using the **Manhattan distance** heuristic to optimize the search.

## 📌 About the Problem

The 15-puzzle consists of a 4x4 board with 15 numbered pieces and one empty space. The goal is to rearrange the pieces until the final sorted state is reached, performing only valid moves (up, down, left, right).

The problem is modeled as a **state graph**, where:

- Each state on the board is a node
- Each move is a transition

---

## ⚙️ Algorithm Used

### 🔹 A* (A-Star)

The A* algorithm uses the function:

f(n) = g(n) + h(n)

Where:
- `g(n)` → actual cost (number of moves made)
- `h(n)` → heuristic (Manhattan distance)

### 🔹 Heuristic

The heuristic used is the **Manhattan distance**, which calculates the sum of the distances of each piece to its final position.

---

## 🚀 How to Run

### ✔ Prerequisites

- Node.js installed

### ✔ Run

```bash
node searchBestChoice.js
