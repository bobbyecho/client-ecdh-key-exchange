import { atob, btoa } from 'abab'

export function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

export function decodeBase64Bytes(str) {
  const decoded = atob(str)
  return str2ab(decoded)
}

export function decodeHexToBytes(str) {
  let r = [];
  for (let i = 0; i < str.length - 1; i += 2) {
      r.push(String.fromCharCode(parseInt(str.charAt(i) + str.charAt(i + 1), 16)));
  }
  const stringg = r.join('');
	return str2ab(stringg);
}

export function encodeByteToBase64(byteArray) {
  const decoded = ab2str(byteArray)
  return btoa(decoded)
}

export function encodeByteToHex(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}
