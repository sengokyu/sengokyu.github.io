---
'created_at: ': '2019-01-09T13:20:29+09:00'
layout: post
published: 'true'
tags: !!python/object/apply:builtins.map
- !!python/name:__main__.%3Clambda%3E ''
- !!python/object/apply:builtins.iter
  args:
  - - name: JavaScript
      versions: []
    - name: TypeScript
      versions: []
  state: 0
title: "[TypeScript] \u6307\u5B9A\u5E74\u6708\u306E\u30AB\u30EC\u30F3\u30C0\u30FC\u4E8C\
  \u6B21\u5143\u914D\u5217\u3092\u51FA\u529B\u3059\u308B\u30D7\u30ED\u30B0\u30E9\u30E0\
  \u30B5\u30F3\u30D7\u30EB"
'updated_at: ': '2019-01-09T13:21:33+09:00'

---
# これはなに？  
  
年、月を渡すと、以下のような配列を返します。  
  
```
/* 2000年2月の場合 */
[
      [null, null, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, null, null, null, null]
]
/* 数値の部分は、実際にはDateオブジェクトです。*/
```  
  
  
# プログラム  
  
**full-calendar.ts**  
```ts:full-calendar.ts
export class FullCalendarService {
  // 通常年の日数/月
  private daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // うるう年の日数/月
  private daysOfMonthOfLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /**
   * 二次元配列を返します。
   * 
   * @param year 年
   * @param month 月1〜12
   */
  public generateWeeksArray(year: number, month: number): Date[][] {
    const monthIndex = month - 1;

    const maxDay = (this.isLeapYear(year)
      ? this.daysOfMonthOfLeap
      : this.daysOfMonth)[monthIndex];
    // 1日の曜日
    const firstDayOfMonth = new Date(Date.UTC(year, monthIndex, 1, 0)).getUTCDay();
    const weeksArray = new Array<Array<Date>>();

    for (let i = 1; i <= maxDay; i++) {
      const row = Math.floor((i - 1 + firstDayOfMonth) / 7);
      const col = (i - 1 + firstDayOfMonth) % 7;

      if (!weeksArray[row]) {
        weeksArray[row] = [null, null, null, null, null, null, null];
      }

      weeksArray[row][col] = new Date(Date.UTC(year, monthIndex, i, 0));
    }

    return weeksArray;
  }

  private isLeapYear(year: number): boolean {
    // 4で割り切れて、100で割り切れなければうるう年
    // ただし400で割り切れればうるう年
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
```  
  
# 使い方  
  
****  
```ts:
const cal200002 = new FullCalendarService().generateWeeksArray(2000, 2);
```  
  
