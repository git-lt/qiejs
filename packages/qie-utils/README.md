## qie-utils

参考： https://github.com/RayAiden/ts-utils

工具类

### Date

- formatDate
- formatISODate
- formatISOTime
- formatISODateTime
- insureDate

#### formatDate 日期格式化

- 参数: dateValue 时间戳 | 日期字符串
- 参数: formatString yyyyMMdd mm:hh:ss

#### 使用

```js
formatDate(new Date().getTime(), "yyyy/MM/dd hh:mm:ss"); // "2019/11/06 15:31:50"
```

#### formatISODate 获取标准日期

date: 时间戳 | 日期字符串 | 日期对象

#### 使用

```js
formatISODate(new Date()); // 2019-11-06
```

#### formatISOTime 获取标准时间

date: 时间戳 | 日期字符串 | 日期对象

```js
formatISOTime(new Date()); // 07:27:33
```

#### formatISODateTime 获取标准日期和时间

date: 时间戳 | 日期字符串 | 日期对象

```js
formatISODateTime(new Date()); // 2019-11-06 07:27:33
```

### DOM

- scrollTop

### Number

- numeral
- randomNum
- toFixedNum
- toDecimalMark
- epsEqDecimal
- px2vw
- vw2Px
- kb2mb
- formatPrice
- unFormat
- formatNum
- add
- sub
- mul
- div

### Base

- isAndroid
- isIphone
- isIpad
- isWx
- isAli
- isPhone
- isObject
- isFunction
- isString
- isBoolean
- isPlainObject
- isUndefined
- isArray
- isNull
- isNullOrUndefined
- isEmpty
- deepClone
- deepMerge

### Rules

- rules
- regMap

### String

- getFileSuffix
- getNameById
- repeat
- delWhitespace
- isEmpty
- countMatches
  randomId

### URL

- url
- getUrlParam
- resolve
- urlToList
- removeParam
- addParam
- updateParam
- obj2pms
- buildUrl
