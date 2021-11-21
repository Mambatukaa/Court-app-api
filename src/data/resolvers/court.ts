import { Schedules } from '../../db/models';
import { ICourtDocument } from '../../db/models/defintions/courts';

export default {
  courtSchedule(court: ICourtDocument) {
    return Schedules.find({ courtId: court._id });
  }
};
