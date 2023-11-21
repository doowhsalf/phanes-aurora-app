// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}

// Senlab T decoder
// Ambiductor AB
// Love Montan Larsson, love@ambiductor.se

/*
senlabT_decodeDatalog(sample_SenlabT_Message_01 = {
  payload: '01FA8FFFFFF87C3C017E0002030000020302000000000000',
  timestamp: '2000-01-01T00:00:00.000Z'
});
*/

function Decode(fPort, bytes, variables) {
  message = {
    payload: toHexString(bytes),
    //timestamp: '2020-01-01T00:00:00.000Z'
    timestamp: Date.now(),
  };
  return senlabT_decodeDatalog(message);
}

function toHexString(byteArray) {
  var s = "";
  byteArray.forEach(function (byte) {
    s += ("0" + (byte & 0xff).toString(16)).slice(-2);
  });
  return s;
}

// Entry point: senlabT_decodeDatalog
// decoding function dedicated to SenlabT messages received on LoRaWAN port 3
function senlabT_decodeDatalog(message) {
  data = str2rray(message.payload);
  time = message.timestamp;
  switch (data[0]) {
    case 1:
      return decode01(data, time);
    default:
      return {
        error: "Unknown prefix " + data[0],
      };
  }
}

var _0x2871 = [
  "slice",
  "data",
  "length",
  "currentTemperatures",
  "unshift",
  "temperature",
  "value",
];
(function (_0x183d9c, _0x28713b) {
  var _0xf92e07 = function (_0x58d7e5) {
    while (--_0x58d7e5) {
      _0x183d9c["push"](_0x183d9c["shift"]());
    }
  };
  _0xf92e07(++_0x28713b);
})(_0x2871, 0xc9);
var _0xf92e = function (_0x183d9c, _0x28713b) {
  _0x183d9c = _0x183d9c - 0x0;
  var _0xf92e07 = _0x2871[_0x183d9c];
  return _0xf92e07;
};
// SenlabT 0x01 frame type decoding (expected on port 3)
// - data is the complete payload (first byte is 0x01)
// - time is the frame reception timestamp (EPOCH format expressed in ms)
function decode01(_0xffc3b0, _0x5ec24f) {
  decoded = {
    battery: {
      level: { unit: "%", value: Math["floor"](_0xffc3b0[0x1] / 2.54) },
    },
    temperature: { unit: "°C", currentTemperatures: [] },
  };
  dec = decode_unsigned(_0xffc3b0[_0xf92e("0x2")](0x2));
  freshness = dec[_0xf92e("0x1")];
  _0xffc3b0 = dec[_0xf92e("0x3")];
  _0x5ec24f -= freshness * 0x3e8;
  dec = decode_unsigned(_0xffc3b0);
  period = dec[_0xf92e("0x1")];
  _0xffc3b0 = dec[_0xf92e("0x3")];
  ref = int16BE(_0xffc3b0);
  measure = { timestamp: _0x5ec24f, value: ref };
  _0xffc3b0 = _0xffc3b0[_0xf92e("0x2")](0x2);
  if (-0x2d0 < measure[_0xf92e("0x1")] && measure[_0xf92e("0x1")] < 0x7d0) {
    if (-0x1 !== measure[_0xf92e("0x1")][0x0]) {
      measure[_0xf92e("0x1")] /= 0x10;
      decoded[_0xf92e("0x0")][_0xf92e("0x5")][_0xf92e("0x6")](measure);
    }
  }
  while (0x0 < _0xffc3b0[_0xf92e("0x4")]) {
    _0x5ec24f -= period * 0x3e8;
    dec = decode_signed(_0xffc3b0);
    _0xffc3b0 = dec[_0xf92e("0x3")];
    measure = { timestamp: _0x5ec24f, value: ref - dec[_0xf92e("0x1")] };
    ref = measure[_0xf92e("0x1")];
    if (-0x2d0 < measure[_0xf92e("0x1")] && measure[_0xf92e("0x1")] < 0x7d0) {
      if (-0x1 !== measure["value"][0x0]) {
        measure["value"] /= 0x10;
        decoded["temperature"][_0xf92e("0x5")]["unshift"](measure);
      }
    }
  }
  return decoded;
}
function decode_unsigned(_0xea2460) {
  idx = 0x0;
  kO = !![];
  length = _0xea2460[_0xf92e("0x4")];
  value = 0x0;
  while (idx < length && kO) {
    if (0x80 === (_0xea2460[idx] & 0x80)) {
      value |= _0xea2460[idx] & 0x7f;
      value <<= 0x7;
    } else {
      kO = ![];
      value |= _0xea2460[idx];
    }
    idx++;
  }
  return { value: value, data: _0xea2460[_0xf92e("0x2")](idx) };
}
function decode_signed(_0x27d259) {
  idx = 0x0;
  kO = !![];
  length = _0x27d259[_0xf92e("0x4")];
  value = 0x0;
  sign = 0x1;
  while (idx < length && kO) {
    if (0x80 === (_0x27d259[idx] & 0x80)) {
      value <<= 0x7;
      value |= _0x27d259[idx] & 0x7f;
    } else {
      kO = ![];
      if (0x1 & _0x27d259[idx]) sign = -0x1;
      value <<= 0x6;
      value |= _0x27d259[idx] >> 0x1;
    }
    idx++;
  }
  if (value > 0x3fffffff) {
    value = value - 0x80000000;
  }
  return { value: sign * value, data: _0x27d259[_0xf92e("0x2")](idx) };
}
function str2rray(_0x282b2f) {
  array = [];
  if (0x0 === _0x282b2f[_0xf92e("0x4")] % 0x2) {
    for (
      var _0x8e6aa3 = _0x282b2f[_0xf92e("0x4")] - 0x2;
      -0x1 < _0x8e6aa3;
      _0x8e6aa3 -= 0x2
    ) {
      array[_0xf92e("0x6")](
        parseInt(_0x282b2f[_0xf92e("0x2")](_0x8e6aa3, _0x8e6aa3 + 0x2), 0x10)
      );
    }
  }
  return array;
}
function int16BE(_0x555993) {
  ref = (_0x555993[0x0] << 0x8) | _0x555993[0x1];
  return ref > 0x7fff ? ref - 0x10000 : ref;
}
function uint16BE(_0x23375d) {
  return (_0x23375d[0x0] << 0x8) | _0x23375d[0x1];
}
