function StartGame(boardElement) {
	// game variables //
	var nextPeiceId = 1;
	var selectedPeice = null;
	
	// constructor functions //
	
	// a game peice
	function Peice(isPlayer) {
		this.isPlayer = isPlayer;
		this.id = "p" + nextPeiceId++;
		this.isKing = false;
		this.x = null;
		this.y = null;
		this.element = document.createElement("span");
		this.element.id = this.id;
		this.element.classList.add("peice");
		if (isPlayer)
			this.element.classList.add("player");
		else
			this.element.classList.add("computer");
	}
	
	
	// create the board
	var board = [];
	var rows = boardElement.getElementsByTagName("tr");
	for (let i = 0; i < 8; i++) {
		board[i] = [];
		var row = rows[i].getElementsByTagName("td");
		
		for (let j = 0; j < 8; j++) {
			board[i][j] = row[j];
		}
	}
	
	// create game peices
	var computerPeices = [],
		playerPeices = [];
	for (let i = 0; i < 12; i++) {
		computerPeices[i] = new Peice(false);
		playerPeices[i] = new Peice(true);
	}
	// add peices to board
	for (let i = 0; i < 12; i++) {
		// er...
		let x2 = x1 = i%4*2;
		let y1 = (i-i%4)/4;
		let y2 = y1 + 5;
		
		// um...
		if (y1%2 == 0)
			x1 += 1;
		else
			x2 += 1;
		
		// step three: profit!
		computerPeices[i].x = x1;
		computerPeices[i].y = y1;
		board[y1][x1].appendChild(computerPeices[i].element);
		
		playerPeices[i].x = x2;
		playerPeices[i].y = y2;
		board[y2][x2].appendChild(playerPeices[i].element);
	}
	
	// attach event listners
	
	boardElement.onclick = function (e) {
		var peice = e.target;
		var cList = peice.classList;
		
		if (cList.contains("player")) {
			if (selectedPeice == null) {
				cList.add("selected");
				selectedPeice = peice;
			} else if (selectedPeice == peice) {
				cList.remove("selected");
				selectedPeice = null;
			} else {
				selectedPeice.classList.remove("selected");
				selectedPeice = peice;
				cList.add("selected");
			}
		}
		
		var x = playerPeices.find(function (p) {
			if (p.id == peice.id)
				return true;
			else
				return false;
		});
		
		console.log(x.x+", "+x.y);
	};
}