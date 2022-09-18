// export default class BigMap {
//   private size;
//   private content;
//   private values;
//
//   constructor(map?: Map<bigint, any>, set?: Set<any>, size: bigint = 0n) {
//     this.content = new Map(map);
//     this.values = new Set(set);
//     this.size = size;
//   }
//
//   get length() {
//     return this.size;
//   }
//
//   get first() {
//     return this.content.get(0n);
//   }
//
//   has(el: any) {
//     return this.values.has(el);
//   }
//
//   add(el: any): this {
//     this.content.set(this.size, el);
//     this.values.add(el);
//     this.size++;
//     return this;
//   }
//
//   forEach(fn: (value: any, key: any, map: Map<any, any>) => void, thisArg?: any) {
//     this.content.forEach(fn, thisArg);
//   }
//
//   clone() {
//     return new BigMap(this.content, this.values, this.size);
//   }
//
//   toString() {
//     let result = '';
//     for (let i = 0n; i < this.size; ++i) {
//       result += `${i===0n ? '' : ','}${this.content.get(i)}`;
//     }
//     return result;
//   }
// }

export default class BigMap {
  private size;
  private content;

  constructor(map: string = '', size: bigint = 0n) {
    this.content = map;
    this.size = size;
  }

  get length() {
    return this.size;
  }

  get first() {
    return this.content.split(',', 1)[0];
  }

  has(el: any) {
    return this.content.match(new RegExp(`[,^]${el}[,$]`, 'g')) !== null;
  }

  add(el: any): this {
    this.content += `${this.size === 0n ? '' : ','}${el}`;
    this.size++;
    return this;
  }

  forEach(fn: (value: any, key: any) => void, thisArg?: any) {
    this.content.split(',').forEach(fn, thisArg);
  }

  clone() {
    return new BigMap(this.content, this.size);
  }

  toString() {
    return this.content;
  }
}
