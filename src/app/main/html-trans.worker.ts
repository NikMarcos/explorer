/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data.transactions} & ${data.assetss}`;
  let amountI;
  function decimal(digit) {
    switch (digit) {
      case 8:
        amountI = 100000000;
        break;
      case 7:
        amountI = 10000000;
        break;
      case 6:
        amountI = 1000000;
        break;
      case 5:
        amountI = 100000;
        break;
      case 4:
        amountI = 10000;
        break;
      case 3:
        amountI = 1000;
        break;
      case 2:
        amountI = 100;
        break;
      case 1:
        amountI = 10;
        break;
      case 0:
        amountI = 1;
        break;
    }
  return amountI;
  };

  let countType1 = 0;
  let countTypeDeposit = 0;
  let countTypeSend = 0;
  let countType7 = 0;
  let countType8 = 0;
  let countType9 = 0;
  let countTypeMassSend = 0;
  let countTypeMassReceive = 0;
  let countType3 = 0;
  let countType5 = 0;
  let countType6 = 0;
  let countType10 = 0;
  let countType12 = 0;
  let countType13 = 0;
  let countType14 = 0;
  let countType15 = 0;
  let countType16 = 0;
  let countType17 = 0;
  let countTypeElse = 0;

  let type;
  let type2;
  let status;
  let amountAsset;
  let priceAsset;
  let cancelLeasingId;
  let assetId;
  let htmlDiv = ``;
  let htmlDivArray = [];



  let commonAssetsList;
  let csvAll = [];
  let csvDeposit = [];
  let csvWithdrawal = [];
  let csvAssets = [];
  let csvEx = [];
  let rawData = data.transactions;
  let listAssets = data.assets;

  for (let i = 1; i < rawData.length; i++) {

    let csvTemp = {};
    let divStyle = {borderBottom:'1px solid black', padding: '3px'};
    // let div = $('<div>');
    let textCorrectName;
    let obj = rawData[i];
    if (obj['type'] == 7) {
      countType7++;
      let decAmount;
      let decPrice;
      let amount;
      let price;
      let spend;
      let residual;
      amountAsset = listAssets[obj['order1']['assetPair']['amountAsset']][0];
      priceAsset = listAssets[obj['order1']['assetPair']['priceAsset']][0];
      residual = listAssets[obj['order1']['assetPair']['amountAsset']][1] - listAssets[obj['order1']['assetPair']['priceAsset']][1];
      if (listAssets[obj['order1']['assetPair']['amountAsset']][2] == "spam" || listAssets[obj['order1']['assetPair']['priceAsset']][2] == "spam") {
        divStyle['backgroundColor'] = '#D3D3D3';
      }
      if (residual >= 0) {
         decAmount = decimal(listAssets[obj['order1']['assetPair']['amountAsset']][1]);
         decPrice = decimal(listAssets[obj['order1']['assetPair']['priceAsset']][1]);
         amount = obj['amount']/decAmount;
         price = obj['price']/decPrice;
         spend = amount*price;
      } else {
        let newResidual = listAssets[obj['order1']['assetPair']['priceAsset']][1] - listAssets[obj['order1']['assetPair']['amountAsset']][1];
        decAmount = decimal(listAssets[obj['order1']['assetPair']['amountAsset']][1]);
        decPrice = decimal(newResidual);
        amount = obj['amount']/decAmount;
        let tempDelim = obj['price']/100000000;
        price = tempDelim/decPrice;
        spend = amount*price;
      }
      if (obj['order1']['sender'] == rawData[0]) {
        if (obj['order1']['orderType'] == 'buy') {
          htmlDivArray.push({
            hidden: ['all', 7],
            class: `7 bal ${obj['timestamp']}`,
            id: `${amountAsset.toLowerCase()} ${priceAsset.toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Trade: Bought', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), amountAsset],
            string2: ['for', spend.toLocaleString('en-US', {maximumSignificantDigits: 16}), priceAsset],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Купил';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        } else {
          htmlDivArray.push({
            hidden: ['all', 7],
            class: `7 bal ${obj['timestamp']}`,
            id: `${amountAsset.toLowerCase()} ${priceAsset.toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Trade: Sold', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), amountAsset],
            string2: ['for', spend.toLocaleString('en-US', {maximumSignificantDigits: 16}), priceAsset],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Продал';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        }
      } else {
        if (obj['order2']['orderType'] == 'buy') {
          htmlDivArray.push({
            hidden: ['all', 7],
            class: `7 bal ${obj['timestamp']} new`,
            id: `${amountAsset.toLowerCase()} ${priceAsset.toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Trade: Bought', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), amountAsset],
            string2: ['for', spend.toLocaleString('en-US', {maximumSignificantDigits: 16}), priceAsset],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Купил';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        } else {
          htmlDivArray.push({
            hidden: ['all', 7],
            class: `7 bal ${obj['timestamp']} new`,
            id: `${amountAsset.toLowerCase()} ${priceAsset.toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Trade: Sold', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), amountAsset],
            string2: ['for', spend.toLocaleString('en-US', {maximumSignificantDigits: 16}), priceAsset],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Продал';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        }
      }
    } else if (obj['type'] == 4) {
      let amm = listAssets[obj['assetId']];
      let amOfAsset = decimal(amm[1]);
      if (obj['sender'] == rawData[0]) {
        countTypeSend++;
        // let amm = listAssets[obj['assetId']];
        // let amOfAsset = decimal(amm[1]);
        if (listAssets[obj['assetId']][2] == "spam") {
          htmlDivArray.push({
            hidden: ['all', 'send'],
            class: `send bal ${obj['timestamp']} spam`,
            id: `${obj['recipient'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Withdrew', (obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
            string2: ['to address', obj['recipient'], ''],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          htmlDiv += `<div class="send bal ${obj['timestamp']} spam"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        } else {
          htmlDivArray.push({
            hidden: ['all', 'send'],
            class: `send bal ${obj['timestamp']}`,
            id: `${obj['recipient'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Withdrew', (obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
            string2: ['to address', obj['recipient'], ''],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          htmlDiv += `<div class="send bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        }
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Вывод`;
        csvTemp['data'] = `${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
        csvAll.push(csvTemp);
        csvWithdrawal.push(csvTemp);
      } else {
        countTypeDeposit++;
        if (listAssets[obj['assetId']][2] == "spam") {
          htmlDivArray.push({
            hidden: ['all', 'deposit'],
            class: `deposit bal ${obj['timestamp']} spam`,
            id: `${obj['sender'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Recieved', (obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
            string2: ['from', obj['sender'], ''],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          htmlDiv += `<div class="deposit bal ${obj['timestamp']} spam"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        } else {
          htmlDivArray.push({
            hidden: ['all', 'deposit'],
            class: `deposit bal ${obj['timestamp']} `,
            id: `${obj['sender'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Recieved', (obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
            string2: ['from', obj['sender'], ''],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          htmlDiv += `<div class="deposit bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        }
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Ввод`;
        csvTemp['data'] = `${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
        csvAll.push(csvTemp);
        csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 1) {
      countType1++;
      htmlDivArray.push({
        hidden: ['all', 'creation'],
        class: `creation bal ${obj['timestamp']} `,
        id: `${obj['recipient'].toLowerCase()} waves ${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Waves creation', (obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16}), 'Waves'],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Создание Waves`;
      csvTemp['data'] = `${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
      csvAll.push(csvTemp);
      csvDeposit.push(csvTemp);

    } else if (obj['type'] == 2) {
        let amOfAsset = 100000000;
        let amount = obj['amount']/amOfAsset;
        if (obj['sender'] == rawData[0]) {
          countTypeSend++;
          htmlDivArray.push({
            hidden: ['all', 'send'],
            class: `send bal ${obj['timestamp']}`,
            id: `${obj['recipient'].toLowerCase()} waves ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Withdrew', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), 'Waves'],
            string2: ['to', obj['recipient'], ''],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Вывод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
          csvAll.push(csvTemp);
          csvWithdrawal.push(csvTemp);
        } else {
          countTypeDeposit++;
          htmlDivArray.push({
            hidden: ['all', 'deposit'],
            class: `deposit bal ${obj['timestamp']} `,
            id: `${obj['sender'].toLowerCase()} waves ${new Date(obj['timestamp']).toLocaleDateString()}`,
            string1: ['Recieved', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), 'Waves'],
            string2: ['from', obj['sender'], ''],
            string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
            string4: ['Id:', obj['id']]
          });
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Ввод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
          csvAll.push(csvTemp);
          csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 11) {
        let amm = listAssets[obj['assetId']];
        let amOfAsset = decimal(amm[1]);
        if (obj['sender'] == rawData[0]) {
          countTypeMassSend++;

          let amount = obj['totalAmount']/amOfAsset;
          if (listAssets[obj['assetId']][2] == "spam") {
            htmlDivArray.push({
              hidden: ['all', 'massSend'],
              class: `massSend bal ${obj['timestamp']} spam`,
              id: `${obj['sender'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
              string1: ['Mass transfer: Withdraw', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
              string2: ['', '', ''],
              string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
              string4: ['Id:', obj['id']]
            });
          } else {
            htmlDivArray.push({
              hidden: ['all', 'massSend'],
              class: `massSend bal ${obj['timestamp']}`,
              id: `${obj['sender'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
              string1: ['Mass transfer: Withdraw', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
              string2: ['', '', ''],
              string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
              string4: ['Id:', obj['id']]
            });
          }
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Массовая транзакция: Вывод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
          csvAll.push(csvTemp);
          csvWithdrawal.push(csvTemp);
        } else {
          countTypeMassReceive++;
          let amount;
          for(let i = 0; i < obj['transfers'].length; i++) {
            if (obj['transfers'][i]['recipient'] == rawData[0]) {
              amount = obj['transfers'][i]['amount']/amOfAsset;
            }
          }
          if (listAssets[obj['assetId']][2] == "spam") {
            htmlDivArray.push({
              hidden: ['all', 'massReceiv'],
              class: `massReceiv bal ${obj['timestamp']} spam`,
              id: `${obj['sender'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
              string1: ['Mass transfer: Deposit', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
              string2: ['from', obj['sender'], ''],
              string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
              string4: ['Id:', obj['id']]
            });
          } else {
            htmlDivArray.push({
              hidden: ['all', 'massReceiv'],
              class: `massReceiv bal ${obj['timestamp']}`,
              id: `${obj['sender'].toLowerCase()} ${listAssets[obj['assetId']][0].toLowerCase()} ${new Date(obj['timestamp']).toLocaleDateString()}`,
              string1: ['Mass transfer: Deposit', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
              string2: ['from', obj['sender'], ''],
              string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
              string4: ['Id:', obj['id']]
            });
          }
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Массовая транзакция: Ввод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
          csvAll.push(csvTemp);
          csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 8) {
      countType8++;
      htmlDivArray.push({
        hidden: ['all', '8'],
        class: `8 bal ${obj['timestamp']} `,
        id: `waves ${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Leasing', (obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16}), 'Waves'],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      // Раскомментировать после перехода на нормальную версию API с debug версии //////////////////
      // if (obj['status'] == 'canceled') {
      //   htmlDiv += ` (отменен)</div></div>`;
      // } else {
      //   htmlDiv += ` (не отменен)</div></div>`;
      // }
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Leasing`;
      csvTemp['data'] = `${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 9) {
      countType9++;
      htmlDivArray.push({
        hidden: ['all', '9'],
        class: `9 bal ${obj['timestamp']} `,
        id: `waves ${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Canceled leasing with ID:', obj['leaseId'], ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Отмена лизинга с ID:`;
      csvTemp['data'] = `${obj['leaseId']}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 3) {
      countType3++;
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['quantity']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        htmlDivArray.push({
          hidden: ['all', '3'],
          class: `3 bal ${obj['timestamp']} spam`,
          id: `${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Created asset:', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
      } else {
        htmlDivArray.push({
          hidden: ['all', '3'],
          class: `3 bal ${obj['timestamp']}`,
          id: `${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Created asset:', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
      }
      if (obj['script'] != null) {
        htmlDiv += ` (скрипт-ассет)`;
      }
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Создание ассета:`;
      csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 6) {
      countType6++;
      console.log(listAssets);
      console.log(obj['assetId']);
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['amount']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        htmlDivArray.push({
          hidden: ['all', '6'],
          class: `6 bal ${obj['timestamp']} spam`,
          id: `${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Asset burning:', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
        htmlDiv += `<div class="6 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        htmlDivArray.push({
          hidden: ['all', '6'],
          class: `6 bal ${obj['timestamp']}`,
          id: `${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Asset burning:', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
        htmlDiv += `<div class="6 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Сжигание ассета:`;
      csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 5) {
      countType5++;
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['quantity']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        htmlDivArray.push({
          hidden: ['all', '5'],
          class: `5 bal ${obj['timestamp']} spam`,
          id: `${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Asset reissuing:', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
        htmlDiv += `<div class="5 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        htmlDivArray.push({
          hidden: ['all', '5'],
          class: `5 bal ${obj['timestamp']}`,
          id: `${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Asset reissuing:', amount.toLocaleString('en-US', {maximumSignificantDigits: 16}), listAssets[obj['assetId']][0]],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
        htmlDiv += `<div class="5 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Довыпуск ассета:`;
      csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 12) {
      countType12++;
      htmlDivArray.push({
        hidden: ['all', '12'],
        class: `12 bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Data-transaction:', '', ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Дата-транзакция`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 10) {
      countType10++;
      htmlDivArray.push({
        hidden: ['all', '10'],
        class: `10 bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Alias creation:', obj['alias'], ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Создание алиаса:`;
      csvTemp['data'] = `${obj['alias']}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 13) {
      countType13++;
      htmlDivArray.push({
        hidden: ['all', '13'],
        class: `13 bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Set script', '', ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Скрипт-транзакция`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 14) {
      if (obj['minSponsoredAssetFee'] == null) {
        htmlDivArray.push({
          hidden: ['all', '14'],
          class: `14 bal ${obj['timestamp']} ${listAssets[obj['assetId']][0]}`,
          id: `${new Date(obj['timestamp']).toLocaleDateString()} ${listAssets[obj['assetId']][0]}`,
          string1: ['Disabling sponsorship for', listAssets[obj['assetId']][0], ''],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Отмена спонсорства`;
        // csvTemp['data'] = type;
        csvAll.push(csvTemp);
      } else {
        countType14++;
        htmlDivArray.push({
          hidden: ['all', '14'],
          class: `14 bal ${obj['timestamp']}`,
          id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
          string1: ['Enabling sponsorship for', listAssets[obj['assetId']][0], ''],
          string2: ['', '', ''],
          string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
          string4: ['Id:', obj['id']]
        });
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Активация спонсорства`;
        // csvTemp['data'] = type;
        csvAll.push(csvTemp);
      }
    } else if (obj['type'] == 15) {
      countType15++;
      htmlDivArray.push({
        hidden: ['all', '15'],
        class: `15 bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Set asset script', listAssets[obj['assetId']][0], ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Установка скрипта на ассет`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 16) {
      countType16++;
      htmlDivArray.push({
        hidden: ['all', '16'],
        class: `16 bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Script Invocation:', '', ''],
        string2: ['dApp address is', obj['dApp'], ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Вызов скрипта`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 17) {
      countType17++;
      htmlDivArray.push({
        hidden: ['all', '17'],
        class: `17 bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Update asset info', '', ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Update asset info`;
      csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else {
      countTypeElse++;
      htmlDivArray.push({
        hidden: ['all', 'else'],
        class: `else bal ${obj['timestamp']}`,
        id: `${new Date(obj['timestamp']).toLocaleDateString()}`,
        string1: ['Unknown transaction', '', ''],
        string2: ['', '', ''],
        string3: ['Date:', new Date(obj['timestamp']).toLocaleString()],
        string4: ['Id:', obj['id']]
      });
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Другая транзакция`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    }
   };
  postMessage([htmlDivArray,
    {
      countType1,
      countTypeDeposit,
      countTypeSend,
      countType7,
      countType8,
      countType9,
      countTypeMassSend,
      countTypeMassReceive,
      countType3,
      countType5,
      countType6,
      countType10,
      countType12,
      countType13,
      countType14,
      countType15,
      countType16,
      countType17,
      countTypeElse
    }
  ]);
});
