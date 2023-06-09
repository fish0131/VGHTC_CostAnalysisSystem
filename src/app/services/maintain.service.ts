import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MaintainService {
  private _humanresourceDataList = [
    {
      humanresourceID: 1,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '107',
      department: '內科部過敏免疫風濕科',
      job: '主治醫師',
      item: '全部',
      salary: 3600000,
      hr: 1992,
      cost: 30.12
    },
    {
      humanresourceID: 2,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '107',
      department: '內科部過敏免疫風濕科',
      job: '主治醫師',
      item: '固定',
      salary: 1200000,
      hr: 1992,
      cost: 10.04
    },
    {
      humanresourceID: 3,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '107',
      department: '內科部過敏免疫風濕科',
      job: '主治醫師',
      item: '變動',
      salary: 2400000,
      hr: 1992,
      cost: 20.08
    },
    {
      humanresourceID: 4,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '107',
      department: '內科部過敏免疫風濕科',
      job: '住院醫師',
      item: '全部',
      salary: 2800000,
      hr: 1992,
      cost: 23.43
    }
  ];

  private _workerhoursDataList = [
    {
      workerhoursID: 1,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '110',
      workday: 251,
      workhours: 2008
    },
    {
      workerhoursID: 2,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '109',
      workday: 250,
      workhours: 2000
    },
    {
      workerhoursID: 3,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '108',
      workday: 249,
      workhours: 1992
    },
    {
      workerhoursID: 4,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '107',
      workday: 249,
      workhours: 1992
    }
  ];

  private _operatingrateDataList = [
    {
      operatingrateID: 1,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '110',
      itemname: '設備維護費率',
      rate: 20
    },
    {
      operatingrateID: 2,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '110',
      itemname: '醫療作業費率',
      rate: 15
    },
    {
      operatingrateID: 3,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '110',
      itemname: '教研及行政費率',
      rate: 28
    },
    {
      operatingrateID: 4,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '109',
      itemname: '設備維護費率',
      rate: 14
    },
    {
      operatingrateID: 5,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '109',
      itemname: '醫療作業費率',
      rate: 29
    },
    {
      operatingrateID: 6,
      createDTTM: '20210802173000',
      createID: 'test',
      createNMC: 'test',
      procDTTM: '20210802173000',
      procID: 'test',
      procNMC: 'test',
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: 'test',
      cancelNMC: 'test',
      year: '109',
      itemname: '教研及行政費率',
      rate: 19
    }
  ];

  private humanresourceDataListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private workerhoursDataListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private operatingrateDataListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  humanresourceDataList$;
  workerhoursDataList$;
  operatingrateDataList$;

  constructor(private authService:AuthService) {
    this.humanresourceDataList$ = this.humanresourceDataListSubject.asObservable();
    this.humanresourceDataListSubject.next(this._humanresourceDataList);

    this.workerhoursDataList$ = this.workerhoursDataListSubject.asObservable();
    this.workerhoursDataListSubject.next(this._workerhoursDataList);

    this.operatingrateDataList$ = this.operatingrateDataListSubject.asObservable();
    this.operatingrateDataListSubject.next(this._operatingrateDataList);
  }

  //-------------------------------------用人成本-------------------------------------------
  updateHRData(HRData?) {
    console.log(HRData, this._humanresourceDataList);
    if (HRData != undefined) {
      let foundDataIdx: any = this._humanresourceDataList.findIndex(
        x => x.humanresourceID === HRData.humanresourceID
      );
      if (foundDataIdx < 0) {
        // 找不到ID, 可能是新增資料
        // 要先打新增資料的api成功後再push資料回現在的陣列裡面
        const max = this._humanresourceDataList.reduce((prev, current) =>
          prev.humanresourceID > current.humanresourceID ? prev : current
        );
        HRData.humanresourceID = max.humanresourceID + 1;
        this._humanresourceDataList.push({ ...HRData });
      } else {
        // 舊資料修改
        this._humanresourceDataList[foundDataIdx] = { ...HRData };
        this._humanresourceDataList[
          foundDataIdx
        ].procDTTM = moment(new Date()).format('YYYYMMDDHHmmSS');
      }
    }
    this.humanresourceDataListSubject.next(HRData);
  }

  getHRData(humanresourceID: number | string) {
    let foundData: any;
    if (typeof humanresourceID === 'string' && humanresourceID === 'new') {
      foundData = [this.newHRData()];
    } else {
      foundData = this._humanresourceDataList.filter(
        x => x.humanresourceID == humanresourceID
      );
    }

    return { ...this.copyObject(foundData[0]) };
  }

  newHRData() {
    return {
      humanresourceID: 'new',
      createDTTM: moment(new Date()).format('YYYYMMDDHHmmSS'),
      createID: this.authService.userInfo.identity,
      createNMC: this.authService.userInfo.name,
      procDTTM: moment(new Date()).format('YYYYMMDDHHmmSS'),
      procID: this.authService.userInfo.identity,
      procNMC: this.authService.userInfo.name,
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: '',
      cancelNMC: '',
      year: '',
      department: this.authService.userInfo.department,
      job: '',
      item: '',
      salary: 0,
      hr: 0,
      cost: 0
    };
  }

  //------------------------------------人事工時------------------------------------------------------

  updateWHData(WHData?) {
    console.log(WHData, this._workerhoursDataList);
    if (WHData != undefined) {
      let foundDataIdx: any = this._workerhoursDataList.findIndex(
        x => x.workerhoursID === WHData.workerhoursID
      );
      if (foundDataIdx < 0) {
        // 找不到ID, 可能是新增資料
        // 要先打新增資料的api成功後再push資料回現在的陣列裡面
        const max = this._workerhoursDataList.reduce((prev, current) =>
          prev.workerhoursID > current.workerhoursID ? prev : current
        );
        WHData.workerhoursID = max.workerhoursID + 1;
        this._workerhoursDataList.push({ ...WHData });
      } else {
        // 舊資料修改
        this._workerhoursDataList[foundDataIdx] = { ...WHData };
        this._workerhoursDataList[
          foundDataIdx
        ].procDTTM = new Date().toString();
      }
    }
    this.workerhoursDataListSubject.next(WHData);
  }

  getWHData(workerhoursID: number | string) {
    let foundData: any;
    if (typeof workerhoursID === 'string' && workerhoursID === 'new') {
      foundData = [this.newHRData()];
    } else {
      foundData = this._workerhoursDataList.filter(
        x => x.workerhoursID == workerhoursID
      );
    }

    return { ...this.copyObject(foundData[0]) };
  }

  newWHData() {
    return {
      workerhoursID: 'new',
      createDTTM: moment(new Date()).format('YYYYMMDDHHmmSS'),
      createID: this.authService.userInfo.identity,
      createNMC: this.authService.userInfo.name,
      procDTTM: moment(new Date()).format('YYYYMMDDHHmmSS'),
      procID: this.authService.userInfo.identity,
      procNMC: this.authService.userInfo.name,
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: '',
      cancelNMC: '',
      year: '',
      workday: 0,
      workhours: 0
    };
  }

  //-----------------------------------作業費率------------------------------------------------------

  updateORData(ORData?) {
    console.log(ORData, this._operatingrateDataList);
    if (ORData != undefined) {
      let foundDataIdx: any = this._operatingrateDataList.findIndex(
        x => x.operatingrateID === ORData.operatingrateID
      );
      if (foundDataIdx < 0) {
        // 找不到ID, 可能是新增資料
        // 要先打新增資料的api成功後再push資料回現在的陣列裡面
        const max = this._operatingrateDataList.reduce((prev, current) =>
          prev.operatingrateID > current.operatingrateID ? prev : current
        );
        ORData.operatingrateID = max.operatingrateID + 1;
        this._operatingrateDataList.push({ ...ORData });
      } else {
        // 舊資料修改
        this._operatingrateDataList[foundDataIdx] = { ...ORData };
        this._operatingrateDataList[
          foundDataIdx
        ].procDTTM = new Date().toString();
      }
    }
    this.operatingrateDataListSubject.next(ORData);
  }

  getORData(operatingrateID: number | string) {
    let foundData: any;
    if (typeof operatingrateID === 'string' && operatingrateID === 'new') {
      foundData = [this.newHRData()];
    } else {
      foundData = this._operatingrateDataList.filter(
        x => x.operatingrateID == operatingrateID
      );
    }

    return { ...this.copyObject(foundData[0]) };
  }

  newORData() {
    return {
      operatingrateID: 'new',
      createDTTM: '',
      createID: this.authService.userInfo.identity,
      createNMC: this.authService.userInfo.name,
      procDTTM: '',
      procID: this.authService.userInfo.identity,
      procNMC: this.authService.userInfo.name,
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: '',
      cancelNMC: '',
      year: '',
      itemname: '',
      rate: 0
    };
  }

  private copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
