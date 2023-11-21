// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}

// Senlab H decoder
// Ambiductor AB
// Love Montan Larsson, love@ambiductor.se

/*
sample_SenlabH_Message_03 = {
  payload: '0384193C017C2C002C002C002C002C',
  timestamp: '2000-01-01T00:00:00.000Z'
}

Decode(3, "A/aCFIRYAWEyADIAMgIyADIAMgAyAzIAMgUyADIDMg==", null);
*/

function Decode(fPort, bytes, variables) {
    message = {
        payload: toHexString(bytes),
        timestamp: Date.now()
    }
    return senlabH_decodeDatalog(message);
}


function toHexString(byteArray) {
    var s = '';
    byteArray.forEach(function (byte) {
        s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
    });
    return s;
}

// Entry point: senlabT_decodeDatalog
// decoding function dedicated to SenlabT messages received on LoRaWAN port 3
function senlabH_decodeDatalog(message) {
    data = str2rray(message.payload)
    time = message.timestamp
    switch (data[0]) {
        case 3:
            return decode03(data, time)
        default:
            return {
                error: 'Unknown prefix ' + data[0]
            }
    }
}

var _0x4189 = ['length', 'floor', 'humidity', 'unshift', 'value', 'max', 'min', 'slice', 'temperature', 'currentHumidity', 'currentTemperatures', 'data']; (function (_0x545636, _0x4189f4) { var _0xa46226 = function (_0x1644aa) { while (--_0x1644aa) { _0x545636['push'](_0x545636['shift']()); } }; _0xa46226(++_0x4189f4); }(_0x4189, 0x1c6)); var _0xa462 = function (_0x545636, _0x4189f4) { _0x545636 = _0x545636 - 0x0; var _0xa46226 = _0x4189[_0x545636]; return _0xa46226; };
// SenlabH 0x03 frame type decoding (expected on port 3)
// - data is the complete payload (first byte is 0x03)
// - time is the frame reception timestamp (EPOCH format expressed in ms)
function decode03(_0x3e68e6, _0x164c6d) { decoded = { 'battery': { 'level': { 'unit': '%', 'value': Math[_0xa462('0x3')](_0x3e68e6[0x1] / 2.54) } }, 'temperature': { 'unit': '°C', 'currentTemperatures': [] }, 'humidity': { 'unit': '%', 'currentHumidity': [] } }; dec = decode_unsigned(_0x3e68e6['slice'](0x2)); freshness = dec[_0xa462('0x6')]; _0x3e68e6 = dec['data']; _0x164c6d -= freshness * 0x3e8; dec = decode_unsigned(_0x3e68e6); period = dec['value']; _0x3e68e6 = dec[_0xa462('0x1')]; ref = _0x3e68e6[0x0] << 0x8 | _0x3e68e6[0x1]; if ((ref & 0x8000) === 0x8000) { ref = ref - 0x10000; } measure = { 'timestamp': (_0x164c6d), 'value': ref }; decoded[_0xa462('0x4')][_0xa462('0xb')]['unshift']({ 'timestamp': (_0x164c6d), 'value': Math[_0xa462('0x7')](0x0, Math[_0xa462('0x8')](_0x3e68e6[0x2], 0x64)) }); _0x3e68e6 = _0x3e68e6[_0xa462('0x9')](0x3); if (-0x2d0 < measure[_0xa462('0x6')] && measure[_0xa462('0x6')] < 0x7d0) { if (-0x1 !== measure[_0xa462('0x6')][0x0]) { measure[_0xa462('0x6')] /= 0x10; decoded[_0xa462('0xa')][_0xa462('0x0')][_0xa462('0x5')](measure); } } while (0x0 < _0x3e68e6[_0xa462('0x2')]) { _0x164c6d -= period * 0x3e8; dec = decode_signed(_0x3e68e6); _0x3e68e6 = dec['data']; decoded[_0xa462('0x4')][_0xa462('0xb')][_0xa462('0x5')]({ 'timestamp': (_0x164c6d), 'value': Math[_0xa462('0x7')](0x0, Math[_0xa462('0x8')](_0x3e68e6[0x0], 0x64)) }); _0x3e68e6 = _0x3e68e6['slice'](0x1); measure = { 'timestamp': (_0x164c6d), 'value': ref - dec[_0xa462('0x6')] }; ref = measure[_0xa462('0x6')]; if (-0x2d0 < measure[_0xa462('0x6')] && measure[_0xa462('0x6')] < 0x7d0) { if (-0x1 !== measure[_0xa462('0x6')][0x0]) { measure[_0xa462('0x6')] /= 0x10; decoded[_0xa462('0xa')][_0xa462('0x0')][_0xa462('0x5')](measure); } } } return decoded; }
function decode_unsigned(_0x4c454f) { idx = 0x0; kO = !![]; length = _0x4c454f[_0xa462('0x2')]; value = 0x0; while (idx < length && kO) { if (0x80 === (_0x4c454f[idx] & 0x80)) { value |= _0x4c454f[idx] & 0x7f; value <<= 0x7; } else { kO = ![]; value |= _0x4c454f[idx]; } idx++; } return { 'value': value, 'data': _0x4c454f[_0xa462('0x9')](idx) }; }
function decode_signed(_0xa28f8e) { idx = 0x0; kO = !![]; length = _0xa28f8e['length']; value = 0x0; sign = 0x1; while (idx < length && kO) { if (0x80 === (_0xa28f8e[idx] & 0x80)) { value <<= 0x7; value |= _0xa28f8e[idx] & 0x7f; } else { kO = ![]; if (0x1 & _0xa28f8e[idx]) sign = -0x1; value <<= 0x6; value |= _0xa28f8e[idx] >> 0x1; } idx++; } if (value > 0x3fffffff) { value = value - 0x80000000; } return { 'value': sign * value, 'data': _0xa28f8e[_0xa462('0x9')](idx) }; }
function str2rray(_0x2c00f2) { array = []; if (0x0 === _0x2c00f2[_0xa462('0x2')] % 0x2) { for (var _0x2235ba = _0x2c00f2['length'] - 0x2; -0x1 < _0x2235ba; _0x2235ba -= 0x2) { array['unshift'](parseInt(_0x2c00f2[_0xa462('0x9')](_0x2235ba, _0x2235ba + 0x2), 0x10)); } } return array; }
function int16BE(_0xaa77b0) { ref = _0xaa77b0[0x0] << 0x8 | _0xaa77b0[0x1]; return ref > 0x7fff ? ref - 0x10000 : ref; }
function uint16BE(_0x276e1c) { return _0x276e1c[0x0] << 0x8 | _0x276e1c[0x1]; }