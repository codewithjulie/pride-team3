console.log('hello from chatbot.js');
// GLOBAL VARIABLES
const chats = {
    bot1: ['Welcome to the community! How can I assist you?'],
    bot2: ['Find like-minded professionals through NetworQ', 'Check out our upcoming events.', 'Use the forum to interact with other members and find resources.', 'Check out recordings of our past events.', 'Read the news around StartOut.'],
    bot3: ['We are glad for your support! Here is how you can contribute:'],
    user1: ['I would like to learn about the community on this site.', 'I would like to contribute to this community.'],
    user3: ['I am looking to become a founder.', 'I am looking to become an investor.', 'I am interested in mentoring StartOut founders.', 'I am a potential donor looking to support through financial contributions.']
}

// DOM SELECTORS
const chatIcon = document.querySelector('.chatIcon')
const chatbot = document.querySelector('.chatbot')
const chatDisplay = document.querySelector('.chatDisplay')

chatIcon.addEventListener('click', () => {
    chatbot.classList.toggle('hidden')
    if (!chatbot.classList.contains('hidden')) {
        // clear chatDisplay
        while (chatDisplay.firstChild) {
            chatDisplay.firstChild.remove()
        }

        chats.bot1.forEach(msg => loading('bot', msg, false))
        setTimeout(() => {
            let timeout = 500
            chats.user1.forEach(msg => {
                setTimeout(() => {loading('user', msg, true)}, timeout)
                timeout += 500
            })
        }, 2000)
        setTimeout(() => {
            loading('bot', "Can't find what you are looking for? You can always reach out to us directly at info@startout.org.", false)
        }, 30000)
    }
})


// HELPER FUNCTIONS
function loading(party, msg, clickable) { // could be fun to use to simulate loading
    const message = document.createElement('p')
    switch (party) {
        case 'bot':
            message.classList.add('chatbotMsg')
            break;
        case 'user':
            message.classList.add('userMsg')
            break;
        default:
            break;
    }
    if (clickable) {
        message.classList.add('clickable')
        message.addEventListener('click', handleUserSelection)
    }
    message.innerText = '...'
    setTimeout(() => {
        chatDisplay.appendChild(message)
        message.scrollIntoView()
    }, 500)
    setTimeout(() => {
        message.innerText = msg
        message.scrollIntoView()
    }, 2000)
}

function handleUserSelection(e) {
    console.log(e.target.innerText);
    chooseAction(e.target.innerText)
}

function chooseAction(msg) {
    switch (msg) {
        case chats.user1[0]:
            let timeout = 500
            chats.bot2.forEach(msg => {
                setTimeout(() => {
                    loading('bot', msg, true)
                }, timeout)
                timeout += 500
            })
            break;
        case chats.user1[1]:
            chats.bot3.forEach(msg => loading('bot', msg, true))
            setTimeout(() => {
                let timeout = 500
                chats.user3.forEach(msg => {
                    setTimeout(() => loading('user', msg, true), timeout)
                    timeout += 500
                })
            }, 2000)
            break;
        case chats.bot2[0]:
            // go to NetworQ
            window.open('https://community.startout.org/networq?SFDCID=0032S00002Sbh6LQAR')
            break;
        case chats.bot2[1]:
            // go to upcoming events
            window.open('https://startout.org/all-events/?SFDCID=0032S00002Sbh6LQAR', '_blank')
            break;
        case chats.bot2[2]:
            // go to forum
            window.open('https://forum.startout.org/feed?SFDCID=0032S00002Sbh6LQAR', '_blank')
            break;
        case chats.bot2[3]:
            // go to recordings
            window.open('https://www.youtube.com/channel/UCMUGpFeFRwvtoveh0CgiW_A/videos', '_blank')
            break;
        case chats.bot2[4]:
            // go to news
            window.open('https://startout.org/news/?SFDCID=0032S00002Sbh6LQAR', '_blank')
            break;
        case chats.user3[0]:
            // go to founder app
            window.open('https://community.startout.org/founderapplication')
            break;
        case chats.user3[1]:
            // go to investor app
            window.open('https://community.startout.org/investorapplication')
            break;
        case chats.user3[2]:
            // go to mentor app
            window.open('https://community.startout.org/mentorapplication')
            break;
        case chats.user3[3]:
            // go to donor settings
            window.open('https://community.startout.org/settings?tab=donation&sub=donations')
            break;
    }
}

