export interface FaultlineGeo {
  results: Result[];
}

export interface FaultlineGeometry {
  faulltGroupTh: string;
  faulltGroupEn: string;
  faultNameTh: string;
  faultNameEn: string;
  paths: number[][][];
}

export interface Result {
  layerId: number;
  layerName: string;
  displayFieldName: string;
  foundFieldName: string;
  value: string;
  attributes: Attributes;
  geometryType: string;
  geometry: Geometry;
}

export interface Attributes {
  OBJECTID: string;
  รหัสกลุ่มรอยเลื่อนมีพลัง: string;
  ชื่อกลุ่มรอยเลื่อนมีพลังภาษาไทย: string;
  ชื่อกลุ่มรอยเลื่อนมีพลังภาษาอังกฤษ: string;
  ชื่อรอยเลื่อนย่อยภาษาไทย: string;
  ชื่อรอยเลื่อนย่อยภาษาอังกฤษ: string;
  ชนิดของรอยเลื่อน: string;
  ทิศทางการวางตัวของรอยเลื่อน: string;
  'มุมเอียงเทของทิศทางการวางตัวของรอยเลื่อนกับแนวดิ่ง หน่วยเป็นองศา': string;
  'ความยาวของรอยเลื่อน หน่วยเป็นกิโลเมตร': string;
  ขนาดแผ่นดินไหวสูงสุดที่เกิดขึ้นได้: string;
  อัตราการเลื่อนตัวของรอยเลื่อน: string;
  'คาบอุบัติซ้ำการเกิดแผ่นดินไหว หน่วยเป็นปี': string;
  ลักษณะธรณีสัณฐานที่บ่งชี้ว่าเป็นรอยเลื่อนมีพลัง: string;
  ประเภทของการเลื่อนตัว: string;
  พื้นที่ด้านที่มีการยกตัวขึ้นของรอยเลื่อน: string;
  'การเลื่อนตัวครั้งล่าสุดของรอยเลื่อน หน่วยเป็นปีที่แล้ว โดยนับจากวันที่หาอายุของรอยเลื่อน (ปี)': string;
  วันที่เก็บตัวอย่างส่งวิเคราะห์: string;
  'อัตราการเลื่อนตัวของรอยเลื่อนต่อเหตุการณ์การเลื่อนตัว (มิลลิเมตร)': string;
  'การหาอายุการเลื่อนตัว (ปี)': string;
  'ระยะการเลื่อนตัว (เมตร)': string;
  'เหตุการเลื่อนตัวที่สำคัญ ๆ ของรอยเลื่อนนั้น ๆ': string;
  Shape: string;
  'Shape.STLength()': string;
}

export interface Geometry {
  paths: number[][][];
  spatialReference: SpatialReference;
}

export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}
export interface PolygonData {
  fName: string;
  area: number[][];
}

export type faultEvents = faultEvent[];

export interface faultEvent {
  dateUtc: string;
  magnitude: number;
  lat: number;
  long: number;
  utmX: number;
  utmY: number;
  depth?: number;
  phase?: number;
  centerTh?: string;
  centerEn?: string;
  severityLevel?: number;
  faultId?: number;
}

export type YearRange = {
  start: string;
  end: string;
};

export type ReplyDataFormat = {
  x: [];
  y: [];
};

export type Point = [number, number];
export type Polygon = number[][];

export type Record = {
  dateUtc: Date;
  magnitude: number;
};
