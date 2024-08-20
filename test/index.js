// // import URL from 'url-parse'
// import { isIP, inRange } from "range_check";
// // import { isValidString } from "../dist/index.js";
// import URLParser from "url-parse";
// // import { isValidUrl } from "../dist/index.js";
// import { isValidQuery, isValidNumber } from "../dist/index.js";
import validator from "validator";

// import { isIPv4InRange } from "../dist/utils/isValidIPv4.js";

import { isValidUrl } from "../dist/index.js";
import { validateString } from "../dist/validateString.js";
const result = validateString("123", {
  whitelist: {
    values: ["123", "456"]
  }
});
console.log(result);
console.log(result.toString());
const { is_valid, error_message } = result
console.log(is_valid, error_message);

console.log(
  isValidUrl("udp://192.0.0.0:8080?localaddr=192.168.1.0&prg=123#fragment", {
    protocol_config: {
      required: true,
      whitelist: {
        values: ["udp"]
      },
      error_label: "Protocol"
    },
    host_config: {
      required: true,
      whitelist: {
        validation_sequence: [(value) => validator.isIP(value, 4)]
      },
      error_messages: {
        whitelist: (type) => {
          if (type === "self_check_0") {
            return "Host should be an IPv4 address";
          }
        }
      }
    },
    port_config: {
      required: true,
      whitelist: {
        ranges: [[1, 8080]]
      },
      error_label: "Port"
    },
    query_config: {
      required: true,
      keys_config: {
        whitelist: ["localaddr", "prg"],
        allow_duplicates: false
      },
      values_config: {
        localaddr: {
          required: true,
          whitelist: {
            validation_sequence: [(value) => validator.isIP(value, 4)]
          },
          error_messages: {
            whitelist: (type) => {
              if (type === "self_check_0") {
                return "localaddr's value should be an IPv4 address";
              }
            }
          }
        },
        prg: {
          type: "number",
          required: true,
          whitelist: {
            ranges: [[100, 8080]]
          },
          error_label: "prg"
        }
      }
    }
  })
);

// console.log(isValidNumber(123, {
//   whitelist: {
//     values: [123, 456],
//     ranges: [[124, 456], [131, 222]]
//   }
// }))

// console.log(
//   isValidQuery("?a=1&b=2&c=3", {
//     keys_config: {
//       whitelist: ["a", "b", "c"],
//       allow_duplicates: false,
//       require_all: true
//     },
//     values_config: {
//       a: {
//         required: true,
//         whitelist: {
//           values: ["1", "2", "3"]
//         }
//       }
//     }
//   })
// );

// console.log(new URLParser("http://example.com:8080?a=1&b=2&c=3&c=4#fragment"));
// console.log(new URLParser("", true));

// console.log(ipaddr.parse("192.168.1.1").toByteArray());
// console.log(ipaddr.parseCIDR("192.168.1.1/24"));
// console.log(isIPv4InRange("192.168.1.13", "192.168.1.1/24"));
// console.log(inRange('192.168.1.1', '193.0.0.0/0'))
// console.log(inRange('192.14.1.1',['10.0.0.0/0','192.14.1.1/6']))

// // 示例 URL 和配置
// const url = "http://example.com/";
// const config = {
//   protocol_config: {
//     required: false
//   },
//   host_config: {
//     required: false,
//     blacklist: {
//       contains: [".."],
//       end_with: ["/"]
//     }
//   },
//   query_key_config: {
//     allowed: false
//   },
//   fragment_config: {
//     allowed: false
//   }
// };

// const result = isValidUrl(url, config);
// console.log(
//   isValidString("123", {
//     required: true,
//     whitelist: {
//       values: ["1233", "456"]
//     },
//     error_label: "String1",
//     error_messages: {
//       typeError: "Type error message"
//     }
//   })
// );
// console.log(result);

// console.log(new URL("http://example.com/?a=1&b=2&c=3",true));
