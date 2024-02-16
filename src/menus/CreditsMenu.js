"use strict"

class CreditsMenu extends Menu {
    constructor() {
        super('CreditsMenu');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x4d4d4d);

        let width = gameSettings.width;
        let height = gameSettings.height;
        let button = new Button(this, 0, 0, width/10, width/10, "X",
            () => {UIManager.Instance.changeMenu('MainMenu')}, undefined, 'topleft');
        this.add.text(width/2, height/2, 
            "Programming: Cole Falxa-Sturken\nArt: Cole (Again)\nSFX: JSFXR.com\nMusic: TBD\n\n"+
            "Additional Credit to SnowBillr\n(SnowBillr's Blog) for button state code",
            {fontFamily: "Monospace", fontSize: "2vw"}
        ).setOrigin(0.4);
    }
}
