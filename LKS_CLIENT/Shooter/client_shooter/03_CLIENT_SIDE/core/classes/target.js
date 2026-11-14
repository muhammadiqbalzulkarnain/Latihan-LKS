class Target {
    constructor() {
        this.content = content
        this.spawnId = null
        this.timer = timer
        this.targetSelected = sessionStorage.getItem('target')

        this.start()
    }

    async start() {
        this.spawn()
        await this.timer.waitCountdownFromThree()
        this.create()
        this.create()
        this.create()
    }

    async spawn() {
        await this.timer.waitCountdownFromThree()
        this.spawnId = setInterval(() => {
            this.create()
            if (this.timer.time <= 0) {
                this.stopSpawn()
            }
        }, 3000);
    }

    stopSpawn() {
        clearInterval(this.spawnId)
    }

    create() {
        const target = document.createElement('img')
        target.src = `./assets/${this.targetSelected}.png`
        target.classList.add('target')

        const x = (Math.random() * 700) + 50
        const y = (Math.random() * 350) + 50
        target.style.top = `${y}px`
        target.style.left = `${x}px`

        this.content.appendChild(target)
    }
}