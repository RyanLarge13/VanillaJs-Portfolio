let appID = '496b46a298054d1194dfc43f4095393a';
let uid;
let token = null;
let channelName;
let userCount = 0;

const messageContainer = document.querySelector('.messages');
let userCountIndicator = document.querySelector('.messages p');
const form = document.querySelector('.input-message-container');
const userMessageContainer = document.querySelector('.input-message-container input');
const sendButton = document.querySelector('.fa-paper-plane');
export const chatBox = document.querySelector('.agora-chatbox');
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
    await channel.join().then(() => {
        userCount++;
        let helloMessage = document.createElement('div');
        helloMessage.className = 'welcome-message';
        helloMessage.innerHTML = 'Welcome to your chat!! if you want to logout of the chat, type in <strong>"leave chat"</strong> and options will appear';
        messageContainer.appendChild(helloMessage);
    });

    sendButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let message = userMessageContainer.value;
        await channel.sendMessage({text: message, type: 'text'});
        sendMessage({text: message});  
    });
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let message = userMessageContainer.value;
        if (message === 'leave chat') {
            return leaveChannel(channel, client);
        }
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
    userCount++;
    userCountIndicator.style.backgroundColor = '#f864ae';
    if (userCount === 1) {
        userCountIndicator.innerHTML = `There is <strong>${userCount}</strong> person in this chatroom`;
    } else {
        userCountIndicator.innerHTML = `There are <strong>${userCount}</strong> people in this chatroom`;
    }
    userCountIndicator.style.opacity = '1';
    setTimeout(() => {
        userCountIndicator.style.opacity = '0';
    }, 5000);
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
    userCount--;
    userCountIndicator.style.backgroundColor = '#e950f7';
    if (userCount === 1) {
        userCountIndicator.innerHTML = `There is <strong>${userCount}</strong> person left in the chatroom`;
    } else {
        userCountIndicator.innerHTML = `There are <strong>${userCount}</strong> people left in this chatroom`;
    }
    userCountIndicator.style.opacity = '1';
    setTimeout(() => {
        userCountIndicator.style.opacity = '0';
    }, 5000);
    let memberleftMessage = document.createElement('div');
    let leftMessage = `${uid}
    left the chat.`;
    memberleftMessage.className = 'user-left';
    memberleftMessage.innerText = `${leftMessage}`;
    messageContainer.insertAdjacentElement('afterbegin', memberleftMessage);
};

const leaveChannel = (channel, client) => {
    let leaveChannelBox = document.createElement('div');
    let leaveButton = document.createElement('button');
    let cancelButton = document.createElement('button');
    leaveButton.className = 'leave-btn';
    cancelButton.className = 'cancel-btn';
    leaveChannelBox.className = 'leave-channel';
    leaveButton.innerHTML = 'Leave';
    cancelButton.innerHTML = 'Cancel';
    leaveChannelBox.appendChild(leaveButton);
    leaveChannelBox.appendChild(cancelButton);
    messageContainer.insertAdjacentElement('afterbegin', leaveChannelBox);

    let allmessages = document.querySelectorAll('.messages div');

    leaveButton.addEventListener('click', async () => {
        leaveChannelBox.remove();
        if (channel != null) {
            await channel.leave();
            await client.logout();
            form.reset();
            allmessages.forEach((message) => {
                message.remove();
            });
            setTimeout(() => {
                channelForm.style.display = 'flex';
            }, 1);
        } else {
            console.log('Hey, there is no channel????');
        }
    });

    cancelButton.addEventListener('click', () => {
        leaveChannelBox.remove();
        form.reset();
    });
}
