import { generatorBase64Code } from '../utils/index';

export default class File {
  constructor(object) {
    this.id = object.id || generatorBase64Code(8);
    this.name = object.name || null;
    this.detail = object.detail || null;
    this.brief = object.brief || null;
    this.author = object.author || null;
    this.size = object.size || 0;
    this.tag = object.tag || null;
    this.cover_photo = object.cover_photo || '';
    this.created_at = object.created_at || null;
    this.price = object.price || 0;
  }
}
