let appID = '496b46a298054d1194dfc43f4095393a';
let uid;
let token = null;
let channelName;
let memberTotal;
let messageCount;

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
const channelNumber = document.querySelector('#channel-number');
const notify = document.querySelector('.notify');

//simple chatbox display function for agora RTM 
export const chatDisplay = () => {
    const contains = chatBox.classList.contains('scale');
    chatBox.style.transition = 'transform 1s ease-in-out';
    chatBox.classList.toggle('scale');
    messageCount = null;
    setTimeout(() => {
        notify.innerHTML = messageCount;
        agoraButton.style.transition = 'transform 250ms ease-in-out';
        agoraButton.classList.toggle('transform-zero');
    }, 300);
    if (!contains) {
        notify.style.transform = 'scale(0)';
    }
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
    if (channelNumber.value === '') {
        channelName = 'Main';
    } else {
        channelName = channelNumber.value;
    }
    channelForm.reset();
    initiateRTM();
    channelForm.style.display = 'none';
});

const initiateRTM = async () => {
    let client = await AgoraRTM.createInstance(appID);
    await client.login({uid, token});

    let channel = await client.createChannel(channelName);
    await channel.join().then(() => {
        let name = uid;
        let helloMessage = document.createElement('div');
        helloMessage.className = 'welcome-message';
        helloMessage.innerHTML = `Welcome <strong>${name}</strong>!! To logout, type in <strong>"leave chat"</strong> or close the browser`;
        messageContainer.appendChild(helloMessage);
    }).catch(() => {
        alert('Failed to join channel, refresh the page and try again');
    });

    sendButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let message = userMessageContainer.value;
        if (message === 'leave chat' || message === 'Leave chat' || message === 'leavechat' || message === 'Leavechat') {
            return leaveChannelMessage(channel, client);
        } else {
            await channel.sendMessage({text: message, type: 'text'});
            sendMessage({text: message});  
        }  
    });
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let message = userMessageContainer.value;
        if (message === 'leave chat' || message === 'Leave chat' || message === 'leavechat' || message === 'Leavechat') {
            return leaveChannelMessage(channel, client);
        } else {
            await channel.sendMessage({text: message, type: 'text'});
            sendMessage({text: message});  
        }
    });

    channel.on('MemberJoined', async () => {
        memberTotal = await channel.getMembers();
        let name = memberTotal[0];
        welcome(memberTotal, name);
    });
    channel.on('ChannelMessage', handleChannelMessage);

    channel.on('MemberLeft', async (uid) => {
        memberTotal = await channel.getMembers();
        memberLeft(uid, memberTotal);
    });

};

const handleChannelMessage = async (message, uid) => {
    addMessageToDom(message, uid);
};

const welcome = async (members, name) => {
    userCountIndicator.style.backgroundColor = '#f864ae';
    if (members.length === 1) {
        userCountIndicator.innerHTML = `There is ${members.length} person in this chatroom`;
    } else {
        userCountIndicator.innerHTML = `There are ${members.length} people in this chatroom`;
    }
    userCountIndicator.style.opacity = '1';
    setTimeout(() => {
        userCountIndicator.style.opacity = '0';
    }, 5000);
    let greetingMessage = `${name} joined the channel!!!`;
    let welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerText = `${greetingMessage}`;
    messageContainer.insertAdjacentElement('afterbegin', welcomeMessage);
    welcomeMessage.scrollIntoView({ behavior: 'smooth' });
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
    ${uid}`;
    messageContainer.insertAdjacentElement('afterbegin', memberMessage);
    memberMessage.scrollIntoView({ behavior: 'smooth' });
    if (chatBox.classList.contains('scale')) {
        messageCount = null;
    } else {
        notify.style.transform = 'translate(-90%, -180%) scale(1)';
        if (messageCount >= 9) {
            return notify.innerHTML = `${9}+`;
        } else {
            messageCount++;
            notify.innerHTML = messageCount;
        }
    }
};

const memberLeft = async (uid, members) => {
    userCountIndicator.style.backgroundColor = '#e950f7';
    if (members.length === 1) {
        userCountIndicator.innerHTML = `There is ${members.length} person left in the chatroom`;
    } else {
        userCountIndicator.innerHTML = `There are ${members.length} people left in this chatroom`;
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
    memberleftMessage.scrollIntoView({ behavior: 'smooth' });
};

const leaveChannelMessage = (channel, client) => {
    form.reset();
    let theLeaveBox = document.querySelector('.leave-channel');
    if (theLeaveBox !== null) {
        return;
    }
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
    leaveChannelBox.scrollIntoView({ behavior: 'smooth' });

    leaveButton.addEventListener('click', () => {
        leaveChannel(channel, client);
    });

    cancelButton.addEventListener('click', () => {
        leaveChannelBox.remove();
    });
};

const leaveChannel = async (channel, client) => {
    if (channel !== null) {
        await channel.leave();
        await client.logout();
        document.location.reload();
    }
};

window.addEventListener('beforeunload', leaveChannel);