import TCRV from "assets/tokens/3crv.png";
import CRV from "assets/tokens/crv.png";
import SDT from "assets/tokens/sdt.png";
import UNKNOWN from "assets/tokens/unknown.png";

export const AddressToIconMapping: any = {
  "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490": TCRV.src,
  "0x73968b9a57c6E53d41345FD57a6E6ae27d6CDB2F": SDT.src,
  "0xD533a949740bb3306d119CC777fa900bA034cd52": CRV.src,
  UNKNOWN,
};

export const AddressToNameMapping: any = {
  "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490": "3CRV",
  "0x73968b9a57c6E53d41345FD57a6E6ae27d6CDB2F": "SDT",
  "0xD533a949740bb3306d119CC777fa900bA034cd52": "CRV",
};
