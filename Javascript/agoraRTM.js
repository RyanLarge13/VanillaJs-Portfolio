let appID = '496b46a298054d1194dfc43f4095393a';
let uid = String(Math.floor(Math.random() * 132));
let token = null;
let channelName = 'main';

const messageContainer = document.querySelector('.messages');
const form = document.querySelector('.input-message-container');
const userMessageContainer = document.querySelector('.input-message-container input');
const sendButton = document.querySelector('.fa-paper-plane');
const chatBox = document.querySelector('.agora-chatbox');
const agoraButton = document.querySelector('.agora-btn');

//simple chatbox display function for agora RTM 
export const chatDisplay = () => {
    chatBox.classList.toggle('scale');
    setTimeout(() => {
        agoraButton.classList.toggle('transform-zero');
    }, 250);
};

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

    channel.on('MemberJoined', (message) => {
        sendMessage(message);
    });
    channel.on('ChannelMessage', handleChannelMessage);

    channel.on('MemberLeft', (uid) => {
        memberLeft(uid);
    });

    chatDisplay();
};

const handleChannelMessage = async (message, uid) => {
    addMessageToDom(message, uid);
};

const sendMessage = async (message) => {
    let greetingMessage = 'Someone new joined the channel!!!';
    if (message.text === undefined && message.text !== '') {
        let welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerText = `${greetingMessage}`;
        messageContainer.insertAdjacentElement('afterbegin', welcomeMessage);
        userMessageContainer.value = null;
        userMessageContainer.placeholder = '';
    }
    if (message.text === '') {
        return;
    }
    if (message.text !== undefined) {
        let myMessage = document.createElement('div');
        myMessage.className = 'my-message';
        myMessage.innerText = `${message.text}`;
        messageContainer.insertAdjacentElement('afterbegin', myMessage);
        userMessageContainer.value = null;
        userMessageContainer.placeholder = '';
        myMessage.scrollIntoView({ behavior: 'smooth' });
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
    userMessageContainer.value = null;
    userMessageContainer.placeholder = '';
    memberMessage.scrollIntoView({ behavior: 'smooth' });
};

const memberLeft = async (uid) => {
    let memberleftMessage = document.createElement('div');
    let leftMessage = `User: ${uid} left the chat.`;
    memberleftMessage.className = 'welcome-message';
    memberleftMessage.innerText = `${leftMessage}`;
    messageContainer.insertAdjacentElement('afterbegin', memberleftMessage);
    userMessageContainer.value = null;
    userMessageContainer.placeholder = '';
};

initiateRTM();