class Quiz {
    constructor(quiz) {
        this.data = quiz
        this.closeButton = document.getElementById('close')
        this.questionEl = document.getElementById('question')
        this.answerEl = document.getElementById('answer')
        this.quizAudio = new Audio('./assets/sounds/learning-activity.wav')
        this.clapAudio = new Audio('./assets/sounds/clap.wav')

        this._close = this.close.bind(this)
        this._selectAnswer = this.selectAnswer.bind(this)
    }

    renderBarrier(src) {
        if (this.getFromStorage().includes(this.data.id)) return false

        this.barrier = document.createElement('img')
        this.barrier.src = src
        this.barrier.classList.add('barrier')
        this.barrier.onclick = this.open.bind(this)
        game.quizBarrierContainerEl.appendChild(this.barrier)
    }

    open() {
        this.quizAudio.play()
        game.quizContainerEl.classList.remove('hidden')
        this.closeButton.onclick = this._close

        this.questionEl.textContent = this.data.question
        let answers = ``
        this.data.choices.forEach(choice => {
            answers += `<div class="answer" data-value="${choice}">${choice}</div>`
        });
        this.answerEl.innerHTML = answers

        this.answerEl.onclick = this._selectAnswer
    }

    selectAnswer(e) {
        if (!e.target.classList.contains('answer')) return false

        if (e.target.dataset.value !== this.data.choices[this.data.correct]) return false

        this.close()
        this.removeBarrier()
        this.saveToStorage()
    }

    saveToStorage() {
        const data = this.getFromStorage()
        data.push(this.data.id)
        window.localStorage.setItem('quiz', JSON.stringify(data))
    }

    getFromStorage() {
        return JSON.parse(window.localStorage.getItem('quiz') || '[]')
    }

    close(e) {
        game.quizContainerEl.classList.add('quiz-close')
        setTimeout(() => {
            game.quizContainerEl.classList.add('hidden')
            game.quizContainerEl.classList.remove('quiz-close')
        }, 500);
    }

    removeBarrier() {
        this.clapAudio.play()
        this.barrier.classList.add('remove-barrier')
        setTimeout(() => {
            this.barrier.remove()
        }, 500);
    }
}