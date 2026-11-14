class Timer {
    constructor() {
        this.time = 0
        this.timeDisplay = document.getElementById('time')
        this.whenTimesUp = null
        const level = sessionStorage.getItem('level')
        switch (level) {
            case 'easy':
                this.time = 30
                break;
            case 'medium':
                this.time = 20
                break;
            case 'hard':
                this.time = 15
                break;

            default:
                break;
        }

        this.timeId = null

        this.start()
    }

    async start() {
        this.updateDisplay()
        await this.waitCountdownFromThree()
        this.timeId = setInterval(() => {
            this.time--
            this.updateDisplay()
            if (this.time <= 0) {
                clearInterval(this.timeId)
                this.whenTimesUp()
            }

        }, 1000);
    }

    updateDisplay() {
        this.timeDisplay.textContent = this.time.toString().padStart(2, '0')
    }

    stop() {
        clearInterval(this.timeId)
    }

    async waitCountdownFromThree() {
        const displayEl = document.getElementById('countdown')
        displayEl.style.display = 'flex'
        for (let i = 3; i >= 1; i--) {
            displayEl.textContent = i
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        displayEl.style.display = 'none'
    }

    setWhenTimesUp(fallback) {
        this.whenTimesUp = fallback
    }
}