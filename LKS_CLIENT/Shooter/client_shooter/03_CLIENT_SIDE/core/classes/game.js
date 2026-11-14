class Game {
    constructor() {
        this.timer = timer
        this.target = target
        this.player = player

        this.pauseDisplay = document.getElementById('pause')
        this.gameOverDisplay = document.getElementById('gameOver')

        this.timer.setWhenTimesUp(this.gameOver.bind(this))
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                if (this.pauseDisplay.dataset.status == 'close') {
                    this.pause()
                } else {
                    this.continue()
                }
            }
        })

        this.displayLeaderBoard()
    }

    pause() {
        this.timer.stop()
        this.target.stopSpawn()
        this.pauseDisplay.style.display = 'flex'
        this.pauseDisplay.dataset.status = 'open'
    }

    continue() {
        this.timer.start()
        this.target.spawn()
        this.pauseDisplay.style.display = 'none'
        this.pauseDisplay.dataset.status = 'close'
    }

    gameOver() {
        document.getElementById('gameOverUsername').textContent = this.player.username
        document.getElementById('gameOverScore').textContent = this.player.score
        this.gameOverDisplay.style.display = 'flex'
    }

    save() {
        let data = JSON.parse(localStorage.getItem('shooter')) || null
        const newData = {
            'username': this.player.username,
            'score': this.player.score,
        }
        console.log(data)
        if (data) {
            data.push(newData)
        } else {
            data = [newData]
        }
        localStorage.setItem('shooter', JSON.stringify(data))
    }

    displayLeaderBoard() {
        let data = JSON.parse(localStorage.getItem('shooter')) || null
        const containerCard = document.getElementById('containerCard')
        const cards = []
        if (data) {
            data.forEach(player => {
                const card = `
                <div class="card">
                    <div>
                        ${player.username}
                    </div>
                    <div>score : <span>${player.score}</span></div>
                </div>
                `
                containerCard.innerHTML += card;
            });
        }
    }
}