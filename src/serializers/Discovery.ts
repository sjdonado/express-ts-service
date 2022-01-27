import { Discovery } from '@interfaces/discovery';

import BaseSerializer from './Base';

class DiscoverySerializer extends BaseSerializer {
  constructor(discovery: Discovery) {
    super(200, discovery);
  }
}

export default DiscoverySerializer;
