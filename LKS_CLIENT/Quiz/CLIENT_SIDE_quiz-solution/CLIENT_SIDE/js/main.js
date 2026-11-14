class Game {
    constructor() {
        this.objectContainerEl = document.getElementById('object-container')
        this.moveAreaEl = document.getElementById('move-area')
        this.quizBarrierContainerEl = document.getElementById('quiz-barrier-container')
        this.quizContainerEl = document.getElementById('quiz-container')
        this.mainEl = document.getElementById('main')
        this.bodyEl = document.getElementById('body')
        this.scene = new Scene()

        this.update()
    }

    reset() {
        window.localStorage.clear()
        window.location.reload()
    }

    update() {
        this.scene.update()
        requestAnimationFrame(this.update.bind(this))
    }
}

const game = new Game