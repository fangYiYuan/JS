// 一个播放器类
class Player {

  constructor() {
    // 初始化观察者列表
    this.watchers = {}

    // 模拟2秒后发布一个'play'事件
    setTimeout(() => {
      this._publish('play', true)
    }, 2000)

    // 模拟4秒后发布一个'pause'事件
    setTimeout(() => {
      this._publish('pause', true)
    }, 4000)
  }

  // 发布事件
  _publish(event, data) {
    if (this.watchers[event] && this.watchers[event].length) {
      this.watchers[event].forEach(callback => callback.bind(this)(data))
    }
  }

  // 订阅事件
  subscribe(event, callback) {
    this.watchers[event] = this.watchers[event] || []
    this.watchers[event].push(callback)
  }

  // 退订事件
  unsubscribe(event = null, callback = null) {
    // 如果传入指定事件函数，则仅退订此事件函数
    if (callback&&event) {
      if (this.watchers[event] && this.watchers[event].length) {
        this.watchers[event].splice(this.watchers[event].findIndex(cb => Object.is(cb, callback)), 1)
      }

    // 如果仅传入事件名称，则退订此事件对应的所有的事件函数
    } else if (event) {
      this.watchers[event] = []

    // 如果未传入任何参数，则退订所有事件
    } else {
      this.watchers = {}
    }
  }
}

// 实例化播放器
const player = new Player()
console.log(player)

// 播放事件回调函数1
const onPlayerPlay1 = function(data) {
  console.log('1: Player is play, the `this` context is current player', this, data)
}

// 播放事件回调函数2
const onPlayerPlay2 = data => {
  console.log('2: Player is play', data)
}

// 暂停事件回调函数
const onPlayerPause = data => {
  console.log('Player is pause', data)
}

// 加载事件回调函数
const onPlayerLoaded = data => {
  console.log('Player is loaded', data)
}

// 可订阅多个不同事件
player.subscribe('play', onPlayerPlay1)
player.subscribe('play', onPlayerPlay2)
player.subscribe('pause', onPlayerPause)
player.subscribe('loaded', onPlayerLoaded)

// 可以退订指定订阅事件
// player.unsubscribe('play', onPlayerPlay2)
// // 退订指定事件名称下的所有订阅事件
// player.unsubscribe('play')
// // 退订所有订阅事件
// player.unsubscribe()

// 可以在外部手动发出事件（真实生产场景中，发布特性一般为类内部私有方法）
player._publish('loaded', true)