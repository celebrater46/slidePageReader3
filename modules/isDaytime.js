const isDaytime = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const h_temp = date.getHours();
    const min = date.getMinutes();
    const h = min / 60 + h_temp; // 18:30 -> 18.5

    // 各月21日の日の出と日没時刻から、昼か夜かを判断（昼なら true）
    switch (month){
        case 1:  return h >= 6.8 && h <= 16.9;
        case 2:  return h >= 6.3 && h <= 17.5;
        case 3:  return h >= 5.7 && h <= 17.9;
        case 4:  return h >= 5.1 && h <= 18.3;
        case 5:  return h >= 4.6 && h <= 18.7;
        case 6:  return h >= 4.4 && h <= 19.0;
        case 7:  return h >= 4.7 && h <= 18.9;
        case 8:  return h >= 5.1 && h <= 18.4;
        case 9:  return h >= 5.5 && h <= 17.7;
        case 10: return h >= 5.9 && h <= 17.0;
        case 11: return h >= 6.3 && h <= 16.5;
        case 12: return h >= 6.8 && h <= 16.5;
        default: return false;
    }
}