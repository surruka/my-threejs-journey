import Experience from "../Experience";
import * as THREE from 'three';
import Environment from "./environment";
import Floor from "./floor";
import Fox from './fox';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor();
      this.fox = new Fox()
      this.environment = new Environment();
      // Environment at the end to affect all the elements before
    })
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}