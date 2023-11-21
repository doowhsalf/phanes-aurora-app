import React from "react";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BusinessIcon from "@mui/icons-material/Business";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DomainIcon from "@mui/icons-material/Domain";
import PersonIcon from "@mui/icons-material/Person";
import WebIcon from "@mui/icons-material/Web";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SensorsIcon from "@mui/icons-material/Sensors";
import HubIcon from "@mui/icons-material/Hub";
import RoomIcon from "@mui/icons-material/Room";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import LanIcon from "@mui/icons-material/Lan";
import RouterIcon from "@mui/icons-material/Router";
import TripOriginIcon from "@mui/icons-material/TripOrigin";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SpeedIcon from "@mui/icons-material/Speed";
import VibrationIcon from "@mui/icons-material/Vibration";
import Co2Icon from "@mui/icons-material/Co2";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AirIcon from "@mui/icons-material/Air";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import CellTowerIcon from "@mui/icons-material/CellTower";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
// Note: DEFCON imports were not used in the given code, so I'm omitting them for brevity
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

/*
POD:        import CloudQueueIcon from '@mui/icons-material/CloudQueue';    
Gateway:     import HubIcon from '@mui/icons-material/Hub';
Sensor:        import SensorsIcon from '@mui/icons-material/Sensors';

Sensorvalues
Temperature:    import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
Humidity:    import WaterDropIcon from '@mui/icons-material/WaterDrop';
Pressure:    import SpeedIcon from '@mui/icons-material/Speed';
Vibration:    import VibrationIcon from '@mui/icons-material/Vibration';
CO2:        import Co2Icon from '@mui/icons-material/Co2';
VOC:        import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
Presensce:    import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
Flow:        import AirIcon from '@mui/icons-material/Air';
Volume:        import BubbleChartIcon from '@mui/icons-material/BubbleChart';
Power:        import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
Energy:        import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
Voltage:    import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
Current:    import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
Battery:    import BatteryStdIcon from '@mui/icons-material/BatteryStd';
Spreading Factor: import CellTowerIcon from '@mui/icons-material/CellTower';
Signal Strength: import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

*/


const iconMapping = {
  CloudQueueIcon: CloudQueueIcon,
  BusinessIcon: BusinessIcon,
  HomeWorkIcon: HomeWorkIcon,
  DomainIcon: DomainIcon,
  PersonIcon: PersonIcon,
  WebIcon: WebIcon,
  DeviceHubIcon: DeviceHubIcon,
  SettingsInputSvideoIcon: SettingsInputSvideoIcon,
  DataUsageIcon: DataUsageIcon,
  ListAltIcon: ListAltIcon,
  SensorsIcon: SensorsIcon,
  HubIcon: HubIcon,
  DataObjectIcon: DataObjectIcon,
  ApartmentOutlinedIcon: ApartmentOutlinedIcon,
  SupervisorAccountIcon: SupervisorAccountIcon,
  InfoIcon: InfoIcon,
  RoomIcon: RoomIcon,
  BuildingIcon: HomeWorkIcon,
  LevelIcon: DomainIcon,
  EquipmentIcon: DeviceHubIcon,
  LanIcon: LanIcon,
  RouterIcon: RouterIcon,
  TripOriginIcon: TripOriginIcon,
  Origin: TripOriginIcon,
  POD: CloudQueueIcon,
  Gateway: HubIcon,
  Sensor: SensorsIcon,
  Sensorvalues: SensorsIcon,
  Temperature: DeviceThermostatIcon,
  Humidity: WaterDropIcon,
  Pressure: SpeedIcon,
  Vibration: VibrationIcon,
  CO2: Co2Icon,
  VOC: SmokingRoomsIcon,
  Presensce: DirectionsRunIcon,
  Flow: AirIcon,
  Volume: BubbleChartIcon,
  Power: ElectricBoltIcon,
  Energy: ElectricMeterIcon,
  Voltage: ElectricBoltIcon,
  Current: ElectricBoltIcon,
  Battery: BatteryStdIcon,
  SpreadingFactor: CellTowerIcon,
  SignalStrength: SignalCellularAltIcon
};

export default function NodeIcon(labelIcon) {
  DEFCON7 && console.log("NodeIcon labelIcon: ", labelIcon);
  if (!labelIcon || !iconMapping[labelIcon]) {
    return SensorsIcon;
  }
  return iconMapping[labelIcon];
}
