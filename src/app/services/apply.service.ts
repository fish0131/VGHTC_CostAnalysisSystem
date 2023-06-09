import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ApplyService {
  private _applyDataList = [
    {
      applyID: 1,
      department: '神經外科',
      medical_item: '影像指引神經阻斷破壞術',
      date: '2021-08-02',
      state: '尚未審核',
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
      applyData: {
        humanResource: [
          {
            department: '一般內科',
            job: '主治醫師',
            numbers: 2,
            cost_min: 33,
            stage1: 0,
            stage2: 0,
            stage3: 0,
            stage4: 0,
            total_min: 0,
            partial_cost: 0
          },
          {
            department: '神經外科',
            job: '主治醫師',
            numbers: 1,
            cost_min: 30,
            stage1: 0,
            stage2: 0,
            stage3: 0,
            stage4: 0,
            total_min: 0,
            partial_cost: 0
          }
        ],
        workHour: [
          {
            id: 1,
            year: '110',
            workday: 251,
            workhours: 2008
          },
          {
            id: 2,
            year: '109',
            workday: 250,
            workhours: 2000
          },
          {
            id: 3,
            year: '108',
            workday: 249,
            workhours: 1992
          },
          {
            id: 4,
            year: '107',
            workday: 249,
            workhours: 1992
          }
        ],
        operatingRate: [
          {
            id: 1,
            year: '110',
            itemname: '設備維護費率',
            rate: 20
          },
          {
            id: 2,
            year: '110',
            itemname: '醫療作業費率',
            rate: 15
          },
          {
            id: 3,
            year: '110',
            itemname: '教研及行政費率',
            rate: 28
          },
          {
            id: 4,
            year: '109',
            itemname: '設備維護費率',
            rate: 14
          },
          {
            id: 5,
            year: '109',
            itemname: '醫療作業費率',
            rate: 29
          },
          {
            id: 6,
            year: '109',
            itemname: '教研及行政費率',
            rate: 19
          },
          {
            id: 7,
            year: '108',
            itemname: '設備維護費率',
            rate: 30
          }
        ],
        deviceFixTop: [
          {
            equipment_fix: '手術床',
            equipment_fix_no: 'TBC4697',
            equipment_fix_cost: 50000,
            equipment_fix_cost_min: 0.4,
            equ_fix_stage1: 0,
            equ_fix_stage2: 0,
            equ_fix_stage3: 0,
            equ_fix_stage4: 0,
            equ_fix_total_min: 0,
            equ_fix_partial_cost: 0
          }
        ],
        deviceFixBottom: [
          {
            equipment_fix_name: '活動型透視機',
            equipment_fix_intro:
              '一年維護成本約7萬，每分鐘維護金額約0.6，占用時間30分',
            equ_fix_partial_cost2: 18
          }
        ],
        deviceDepreciationTop: [
          {
            equipment: '手術床',
            equipment_no: 'TBC4697',
            equipment_cost: 1700000,
            used_year: 8,
            equipment_cost_min: 0.4,
            equ_stage1: 0,
            equ_stage2: 0,
            equ_stage3: 0,
            equ_stage4: 0,
            equ_total_min: 0,
            equ_partial_cost: 0
          }
        ],
        deviceDepreciationBottom: [
          {
            equipment_name: '超音波掃描器',
            equipment_intro: '美國進口20萬',
            equ_partial_cost2: 200000
          }
        ],
        transferExam: [
          {
            exam: '基因檢測',
            exam_intro: 'ABCDEFGHIJK',
            exam_partial_cost: 5000
          }
        ],
        materialWithPrice: [
          {
            priced_kit: '麻醉藥',
            priced_kit_no: 'AAC452',
            priced_kit_unit: 'EA',
            priced_kit_unit_cost: 100,
            priced_kit_stage1: 0,
            priced_kit_stage2: 0,
            priced_kit_stage3: 0,
            priced_kit_stage4: 0,
            priced_kit_total_num: 0,
            priced_kit_partial_cost: 0
          }
        ],
        materialNoPrice: [
          {
            unpriced_kit: '4吋紗布',
            unpriced_kit_no: 'CJ5300001051',
            unpriced_kit_unit: 'PKG',
            unpriced_kit_unit_cost: 9,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          },
          {
            unpriced_kit: '無菌外科手套',
            unpriced_kit_no: 'C14460003012',
            unpriced_kit_unit: 'PAIR',
            unpriced_kit_unit_cost: 14.8,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          },
          {
            unpriced_kit: '塑膠空針',
            unpriced_kit_no: 'CJ5860012011',
            unpriced_kit_unit: 'EA',
            unpriced_kit_unit_cost: 1.44,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          },
          {
            unpriced_kit: '針頭',
            unpriced_kit_no: 'CJ5860004060',
            unpriced_kit_unit: 'EA',
            unpriced_kit_unit_cost: 0.43,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          }
        ]
      }
    },
    {
      applyID: 2,
      department: '麻醉部',
      medical_item: 'PR-IV 經靜脈自控式止痛術(三日)',
      date: '2021-08-10',
      state: '尚未審核',
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
      applyData: {
        humanResource: [
          {
            department: '神經外科',
            job: '主治醫師',
            numbers: 1,
            cost_min: 33,
            stage1: 0,
            stage2: 0,
            stage3: 0,
            stage4: 0,
            total_min: 0,
            partial_cost: 0
          },
          {
            department: '神經外科',
            job: '醫事人員',
            numbers: 1,
            cost_min: 9.3,
            stage1: 0,
            stage2: 0,
            stage3: 0,
            stage4: 0,
            total_min: 0,
            partial_cost: 0
          },
          {
            department: '護理部手術室',
            job: '護理人員',
            numbers: 1,
            cost_min: 7.8,
            stage1: 0,
            stage2: 0,
            stage3: 0,
            stage4: 0,
            total_min: 0,
            partial_cost: 0
          }
        ],
        workHour: [
          {
            id: 1,
            year: '110',
            workday: 251,
            workhours: 2008
          },
          {
            id: 2,
            year: '109',
            workday: 250,
            workhours: 2000
          },
          {
            id: 3,
            year: '108',
            workday: 249,
            workhours: 1992
          },
          {
            id: 4,
            year: '107',
            workday: 249,
            workhours: 1992
          }
        ],
        operatingRate: [
          {
            id: 1,
            year: '110',
            itemname: '設備維護費率',
            rate: 20
          },
          {
            id: 2,
            year: '110',
            itemname: '醫療作業費率',
            rate: 15
          },
          {
            id: 3,
            year: '110',
            itemname: '教研及行政費率',
            rate: 28
          },
          {
            id: 4,
            year: '109',
            itemname: '設備維護費率',
            rate: 14
          },
          {
            id: 5,
            year: '109',
            itemname: '醫療作業費率',
            rate: 29
          },
          {
            id: 6,
            year: '109',
            itemname: '教研及行政費率',
            rate: 19
          },
          {
            id: 7,
            year: '108',
            itemname: '設備維護費率',
            rate: 30
          }
        ],
        deviceFixTop: [
          {
            equipment_fix: '手術床',
            equipment_fix_no: 'TBC4697',
            equipment_fix_cost: 50000,
            equipment_fix_cost_min: 0.4,
            equ_fix_stage1: 0,
            equ_fix_stage2: 0,
            equ_fix_stage3: 0,
            equ_fix_stage4: 0,
            equ_fix_total_min: 0,
            equ_fix_partial_cost: 0
          }
        ],
        deviceFixBottom: [
          {
            equipment_fix_name: '活動型透視機',
            equipment_fix_intro:
              '一年維護成本約7萬，每分鐘維護金額約0.6，占用時間30分',
            equ_fix_partial_cost2: 18
          }
        ],
        deviceDepreciationTop: [
          {
            equipment: '手術床',
            equipment_no: 'TBC4697',
            equipment_cost: 1700000,
            used_year: 8,
            equipment_cost_min: 0.4,
            equ_stage1: 0,
            equ_stage2: 0,
            equ_stage3: 0,
            equ_stage4: 0,
            equ_total_min: 0,
            equ_partial_cost: 0
          }
        ],
        deviceDepreciationBottom: [],
        transferExam: [],
        materialWithPrice: [
          {
            priced_kit: '麻醉藥',
            priced_kit_no: 'AAC452',
            priced_kit_unit: 'EA',
            priced_kit_unit_cost: 100,
            priced_kit_stage1: 0,
            priced_kit_stage2: 0,
            priced_kit_stage3: 0,
            priced_kit_stage4: 0,
            priced_kit_total_num: 0,
            priced_kit_partial_cost: 0
          }
        ],
        materialNoPrice: [
          {
            unpriced_kit: '4吋紗布',
            unpriced_kit_no: 'CJ5300001051',
            unpriced_kit_unit: 'PKG',
            unpriced_kit_unit_cost: 9,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          },
          {
            unpriced_kit: '無菌外科手套',
            unpriced_kit_no: 'C14460003012',
            unpriced_kit_unit: 'PAIR',
            unpriced_kit_unit_cost: 14.8,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          },
          {
            unpriced_kit: '塑膠空針',
            unpriced_kit_no: 'CJ5860012011',
            unpriced_kit_unit: 'EA',
            unpriced_kit_unit_cost: 1.44,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          },
          {
            unpriced_kit: '針頭',
            unpriced_kit_no: 'CJ5860004060',
            unpriced_kit_unit: 'EA',
            unpriced_kit_unit_cost: 0.43,
            unpriced_kit_stage1: 0,
            unpriced_kit_stage2: 0,
            unpriced_kit_stage3: 0,
            unpriced_kit_stage4: 0,
            unpriced_kit_total_num: 0,
            unpriced_kit_partial_cost: 0
          }
        ]
      }
    }
  ];

  today = new Date();

  private applyDataListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  applyDataList$;
  constructor(public authService: AuthService) {
    this.applyDataList$ = this.applyDataListSubject.asObservable();
    this.applyDataListSubject.next(this._applyDataList);
    //
  }

  updateData(applyData?) {
    console.log(applyData, this._applyDataList);
    if (applyData != undefined) {
      let foundDataIdx: any = this._applyDataList.findIndex(
        x => x.applyID === applyData.applyID
      );
      if (foundDataIdx < 0) {
        // 找不到ID, 可能是新增資料
        // 要先打新增資料的api成功後再push資料回現在的陣列裡面
        const max = this._applyDataList.reduce((prev, current) =>
          prev.applyID > current.applyID ? prev : current
        );
        applyData.applyID = max.applyID + 1;
        this._applyDataList.push({ ...applyData });
      } else {
        // 舊資料修改
        this._applyDataList[foundDataIdx] = { ...applyData };
        this._applyDataList[foundDataIdx].procDTTM = moment(new Date()).format(
          'YYYYMMDDHHmmSS'
        );
      }
    }
    this.applyDataListSubject.next(this._applyDataList);
  }

  getData(applyID: number | string) {
    let foundData: any;
    if (typeof applyID === 'string' && applyID === 'new') {
      foundData = [this.newApplyData()];
    } else {
      foundData = this._applyDataList.filter(x => x.applyID == applyID);
    }

    return { ...this.copyObject(foundData[0]) };
  }

  newApplyData() {
    return {
      applyID: 'new',
      department: this.authService.userInfo.department, // 預設抓使用者資料
      medical_item: '',
      date: moment(new Date()).format('YYYYMMDD'), // 預設為當天
      state: '尚未審核',
      createDTTM: moment(new Date()).format('YYYYMMDDHHmmSS'),
      createID: this.authService.userInfo.identity, // 預設抓使用者資料
      createNMC: this.authService.userInfo.name, // 預設抓使用者資料
      procDTTM: moment(new Date()).format('YYYYMMDDHHmmSS'),
      procID: this.authService.userInfo.identity, // 預設抓使用者資料
      procNMC: this.authService.userInfo.name, // 預設抓使用者資料
      cancelYN: 'N',
      cancelDTTM: '',
      cancelID: '',
      cancelNMC: '',
      applyData: {
        humanResource: [],
        workHour: [],
        operatingRate: [],
        deviceFixTop: [],
        deviceFixBottom: [],
        deviceDepreciationTop: [],
        deviceDepreciationBottom: [],
        transferExam: [],
        materialWithPrice: [],
        materialNoPrice: []
      }
    };
  }

  private copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
