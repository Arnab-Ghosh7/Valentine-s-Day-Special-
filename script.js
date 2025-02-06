document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const bigHeart = document.querySelector('.big-heart');
    const explosionText = document.querySelector('.explosion-text');
    const cards = document.querySelectorAll('.card');
    let hasClicked = false; 

    const animatePhotoFrames = () => {
        const frames = document.querySelectorAll('.photo-frame');
        frames.forEach((frame, index) => {
            setTimeout(() => {
                frame.classList.add('show');
            }, index * 300); 
        });
    };

   
    bigHeart.addEventListener('click', () => {
        
        if (hasClicked) return;
        hasClicked = true;

        
        const heartText = bigHeart.querySelector('.heart-text');
        if (heartText) {
            heartText.style.display = 'none';
        }
        bigHeart.classList.remove('clickable');
        
        bigHeart.style.animation = 'none'; 
        setTimeout(() => {
            bigHeart.style.animation = 'heart-explosion 3s ease-in-out forwards';
        }, 10);
        
        setTimeout(() => {
            if (explosionText) {
                explosionText.style.display = 'block';
                explosionText.style.animation = 'text-reveal 1s ease-out forwards';
            }
        }, 1500);
        
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            createFloatingHearts();
            
            
            setTimeout(animatePhotoFrames, 500);
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('dealt');
                    try {
                        const dealSound = new Audio('card-deal.mp3');
                        dealSound.volume = 0.2;
                        dealSound.play().catch(() => {});
                    } catch (error) {
                        console.log('Sound effect not available');
                    }
                }, (index * 200) + 1000); 
            });
        }, 4000);
    });
});


function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        
        
        heart.style.animation = `
            float-up ${Math.random() * 3 + 2}s linear infinite,
            sway ${Math.random() * 4 + 3}s ease-in-out infinite alternate
        `;
        
        container.appendChild(heart);
    }
}


const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% { transform: translateY(100vh); }
        100% { transform: translateY(-100px); }
    }
    
    @keyframes sway {
        0% { transform: translateX(-30px); }
        100% { transform: translateX(30px); }
    }
`;
document.head.appendChild(style);


createFloatingHearts();


setInterval(createFloatingHearts, 10000);


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const hoverSound = new Audio('card-hover.mp3'); 
        hoverSound.volume = 0.2;
        hoverSound.play().catch(() => {});
    });
});


const rightCards = document.querySelectorAll('.right-card');

rightCards.forEach(card => {
    card.addEventListener('click', function() {
       
        rightCards.forEach(c => {
            c.classList.remove('active');
            c.style.transform = 'none';
        });
        
        
        this.classList.add('active');
    });
});

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

setInterval(createHeart, 300);

for(let i = 0; i < 20; i++) {
    setTimeout(createHeart, Math.random() * 3000);
}


window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('throw');
        });
    }, 500);

    
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('show');
        });
    }, 100);

    
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('move');
        });
    }, 1000);
}); 