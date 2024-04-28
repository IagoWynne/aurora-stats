import { AURORA_DARK_GREEN, AURORA_LIGHT_GREEN } from "../../Colours";

export default class WheelModel {
  private COLOURS: string[];
  private centreX: number;
  private centreY: number;
  private radius: number;
  private currentRotation: number;
  private totalItems: number;
  private totalPoints: number;
  private fontColour: string;

  constructor(
    private items: string[],
    private size: number,
    private ctx: CanvasRenderingContext2D
  ) {
    this.COLOURS = [
      AURORA_DARK_GREEN,
      AURORA_LIGHT_GREEN,
      "#4ddabd",
      "#ffffff",
    ];
    this.fontColour = "#000000";

    this.centreX = size / 2;
    this.centreY = size / 2;
    this.radius = size / 2 - 30;
    this.currentRotation = 0;
    this.totalItems = items.length;
    this.totalPoints = 100000;
  }

  public paint() {
    this.ctx.clearRect(0, 0, this.size, this.size);
    this.drawPin();
    this.items.map((item, i) => {
      this.drawSection(item, i);
    });
  }

  private drawPin() {
    this.ctx.save();
    this.ctx.fillStyle = "#071947";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "#071947";
    this.ctx.beginPath();
    this.ctx.moveTo(this.centreX - 20, 0);
    this.ctx.lineTo(this.centreX, 20);
    this.ctx.lineTo(this.centreX + 20, 0);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  private drawSection(item: string, sectionNumber: number) {
    const arcStartPoint = this.calculateArcPoint(sectionNumber - 1);
    const arcEndPoint = this.calculateArcPoint(sectionNumber);

    this.drawWedge(sectionNumber, arcStartPoint, arcEndPoint);

    this.drawLabel(arcStartPoint, arcEndPoint, item);
  }

  private calculateArcPoint(sectionNumber: number) {
    const rotation = ((2 * Math.PI) / this.totalPoints) * this.currentRotation;
    return (2 / this.totalItems) * (sectionNumber - 1) * Math.PI + rotation;
  }

  private drawWedge(
    sectionNumber: number,
    arcStartPoint: number,
    arcEndPoint: number
  ) {
    this.ctx.save();
    this.ctx.fillStyle = this.getColour(sectionNumber);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#071947";
    this.ctx.beginPath();
    this.ctx.moveTo(this.centreX, this.centreY);

    this.ctx.arc(
      this.centreX,
      this.centreY,
      this.radius,
      arcStartPoint,
      arcEndPoint
    );
    this.ctx.moveTo(this.centreX, this.centreY);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  private getColour(itemNumber: number): string {
    return this.COLOURS[(itemNumber + 1) % (this.COLOURS.length - 1)];
  }

  private drawLabel(arcStartPoint: number, arcEndPoint: number, label: string) {
    this.ctx.save();
    this.ctx.font = `${this.size / 30}px verdana`;
    var midAngle = arcStartPoint + (arcEndPoint - arcStartPoint) / 2;
    var labelRadius = this.radius * 0.65;
    const textWidth = this.ctx.measureText(label).width;
    var x = this.centreX + labelRadius * Math.cos(midAngle) - textWidth / 2;
    var y = this.centreY + labelRadius * Math.sin(midAngle);

    this.ctx.fillStyle = this.fontColour;
    this.ctx.fillText(label, x, y);
    this.ctx.restore();
  }

  public rotate(amount: number = 100) {
    if (this.currentRotation < this.totalPoints - 1) {
      this.currentRotation += amount;
    } else {
      this.currentRotation = 0;
    }
  }

  public getCurrentSection() {
    const percentage = this.currentRotation / 100000;

    const index =
      this.items.length - Math.trunc(this.items.length * percentage) - 1;

    if (index <= 0) {
      return this.items[this.items.length - 1];
    }

    return this.items[
      this.items.length - Math.trunc(this.items.length * percentage) - 2
    ];
  }
}
