class Player {
    constructor() {
        this.score = 0
        this.username = sessionStorage.getItem('username')
        this.scoreDisplay = document.getElementById('score')
        this.usernameDisplay = document.getElementById('username')

        this.usernameDisplay.textContent = this.username
        this.scoreDisplay.textContent = this.score
    }

    scoreIncrease() {
        this.score++
        this.scoreDisplay.textContent = this.score
    }
}