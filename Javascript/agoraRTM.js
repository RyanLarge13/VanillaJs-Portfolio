let appID = '496b46a298054d1194dfc43f4095393a';
let uid;
let token = null;
let channelName;

const messageContainer = document.querySelector('.messages');
const form = document.querySelector('.input-message-container');
const userMessageContainer = document.querySelector('.input-message-container input');
const sendButton = document.querySelector('.fa-paper-plane');
const chatBox = document.querySelector('.agora-chatbox');
const agoraButton = document.querySelector('.agora-btn');
const main = document.querySelector('main');
const channelForm = document.querySelector('.channel-form');
const userName = document.querySelector('#name');
const channelNumber = document.querySelector('#channel-number')

//simple chatbox display function for agora RTM 
export const chatDisplay = () => {
    chatBox.classList.toggle('scale');
    setTimeout(() => {
        agoraButton.classList.toggle('transform-zero');
    }, 250);
};

main.addEventListener('click', () => {
    chatBox.classList.remove('scale');
    agoraButton.classList.remove('transform-zero');
});

channelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userName.value === '') {
        uid = String(Math.floor(Math.random() * 123));
    } else {
        uid = String(userName.value);
    }
    channelName = channelNumber.value;
    channelForm.reset();
    initiateRTM();
    channelForm.style.display = 'none';
});

const initiateRTM = async () => {
    let client = await AgoraRTM.createInstance(appID);
    await client.login({uid, token});

    const channel = await client.createChannel(channelName);
    await channel.join();

    sendButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let message = userMessageContainer.value;
        await channel.sendMessage({text: message, type: 'text'});
        sendMessage({text: message});  
    });
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let message = userMessageContainer.value;
        await channel.sendMessage({text: message, type: 'text'});
        sendMessage({text: message});  
    });

    channel.on('MemberJoined', () => {
        welcome();
    });
    channel.on('ChannelMessage', handleChannelMessage);

    channel.on('MemberLeft', (uid) => {
        memberLeft(uid);
    });

};

const handleChannelMessage = async (message, uid) => {
    addMessageToDom(message, uid);
};

const welcome = async () => {
    let greetingMessage = `Someone new joined the channel!!!`;
    let welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerText = `${greetingMessage}`;
    messageContainer.insertAdjacentElement('afterbegin', welcomeMessage);
}

const sendMessage = async (message) => {
    if (message.text === '') {
        return;
    }
    if (message.text !== undefined) {
        let myMessage = document.createElement('div');
        myMessage.className = 'my-message';
        myMessage.innerText = `${message.text}`;
        messageContainer.insertAdjacentElement('afterbegin', myMessage);
        myMessage.scrollIntoView({ behavior: 'smooth' });
        form.reset();
        userMessageContainer.placeholder = '';
    }
};

const addMessageToDom = async (message, uid) => {
    if (message.text === '') {
        return;
    }
    let memberMessage = document.createElement('div');
    memberMessage.className = 'user-message';
    memberMessage.innerText = `${message.text} 
    user: ${uid}`;
    messageContainer.insertAdjacentElement('afterbegin', memberMessage);
    memberMessage.scrollIntoView({ behavior: 'smooth' });
};

const memberLeft = async (uid) => {
    let memberleftMessage = document.createElement('div');
    let leftMessage = `${uid}
    left the chat.`;
    memberleftMessage.className = 'user-left';
    memberleftMessage.innerText = `${leftMessage}`;
    messageContainer.insertAdjacentElement('afterbegin', memberleftMessage);
};
