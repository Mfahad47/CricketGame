document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('playBall').addEventListener('click', playBall);

let team1, team2, overs, maxBalls, score, wickets, balls, currentOver;
let opponentScore, opponentWickets, opponentBalls, opponentOver;
let isOpponentTurn = false;

function startGame() {
    team1 = document.getElementById('team1').value;
    team2 = document.getElementById('team2').value;
    overs = parseInt(document.getElementById('overs').value);

    if (team1 === team2) {
        alert('Teams should be different!');
        return;
    }

    maxBalls = overs * 6;
    score = 0;
    wickets = 0;
    balls = 0;
    currentOver = 0;

    opponentScore = 0;
    opponentWickets = 0;
    opponentBalls = 0;
    opponentOver = 0;

    isOpponentTurn = false;

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('wickets').innerText = `Wickets: ${wickets}`;
    document.getElementById('balls').innerText = `Balls: ${balls}`;
    document.getElementById('oversCompleted').innerText = `Overs: ${currentOver}`;

    document.getElementById('opponentScore').innerText = `Score: ${opponentScore}`;
    document.getElementById('opponentWickets').innerText = `Wickets: ${opponentWickets}`;
    document.getElementById('opponentBalls').innerText = `Balls: ${opponentBalls}`;
    document.getElementById('opponentOversCompleted').innerText = `Overs: ${opponentOver}`;

    document.getElementById('playBall').disabled = false;
}

function playBall() {
    const outcomes = [0,1, 2, 3, 4, 6, 'Out'];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    if (!isOpponentTurn) {
        balls++;
        if (balls % 6 === 0) {
            currentOver++;
        }

        if (outcome === 'Out') {
            wickets++;
        } else {
            score += outcome;
        }

        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('wickets').innerText = `Wickets: ${wickets}`;
        document.getElementById('balls').innerText = `Balls: ${balls}`;
        document.getElementById('oversCompleted').innerText = `Overs: ${currentOver}`;

        if (wickets >= 10 || balls >= maxBalls) {
            isOpponentTurn = true;
            alert(`${team1}'s innings over. ${team2}'s turn to play.`);
        }
    } else {
        opponentBalls++;
        if (opponentBalls % 6 === 0) {
            opponentOver++;
        }

        if (outcome === 'Out') {
            opponentWickets++;
        } else {
            opponentScore += outcome;
        }

        document.getElementById('opponentScore').innerText = `Score: ${opponentScore}`;
        document.getElementById('opponentWickets').innerText = `Wickets: ${opponentWickets}`;
        document.getElementById('opponentBalls').innerText = `Balls: ${opponentBalls}`;
        document.getElementById('opponentOversCompleted').innerText = `Overs: ${opponentOver}`;

        if (opponentWickets >= 10 || opponentBalls >= maxBalls || opponentScore > score) {
            document.getElementById('playBall').disabled = true;
            if (score > opponentScore) {
                alert(`${team1} wins! Final Score: ${score}/${wickets} to ${opponentScore}/${opponentWickets}`);
            } else if (opponentScore > score) {
                alert(`${team2} wins! Final Score: ${opponentScore}/${opponentWickets} to ${score}/${wickets}`);
            } else {
                alert(`It's a tie! Final Score: ${score}/${wickets} to ${opponentScore}/${opponentWickets}`);
            }
        }
    }
}
