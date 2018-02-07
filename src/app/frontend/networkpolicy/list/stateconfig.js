// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {stateName as chromeStateName} from '../../chrome/state';
import {breadcrumbsConfig} from '../../common/components/breadcrumbs/service';
import {stateName as workloadsStateName} from '../../discovery/state';

import {stateUrl} from './../state';
import {NetworkPolicyListController} from './controller';

/**
 * I18n object that defines strings for translation used in this file.
 */
const i18n = {
  /** @type {string} @desc Label 'Network Policy' that appears as a breadcrumbs on the
   action bar. */
  MSG_BREADCRUMBS_NETWORKPOLICY_AT_LABEL: goog.getMsg('Network Policy'),
};

/**
 * Config state object for the networkpolicy list view.
 *
 * @type {!ui.router.StateConfig}
 */
export const config = {
  url: stateUrl,
  parent: chromeStateName,
  resolve: {
    'networkPolicyList': resolveNetworkPolicyList,
  },
  data: {
    [breadcrumbsConfig]: {
      'label': i18n.MSG_BREADCRUMBS_NETWORKPOLICY_AT_LABEL,
      'parent': workloadsStateName,
    },
  },
  views: {
    '': {
      controller: NetworkPolicyListController,
      controllerAs: '$ctrl',
      templateUrl: 'networkpolicy/list/list.html',
    },
  },
};

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function networkPolicyListResource($resource) {
  return $resource('api/v1/networkpolicy/:namespace');
}

/**
 * @param {!angular.Resource} kdNetworkPolicyListResource
 * @param {!./../../chrome/state.StateParams} $stateParams
 * @param {!./../../common/dataselect/service.DataSelectService} kdDataSelectService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveNetworkPolicyList(
    kdNetworkPolicyListResource, $stateParams, kdDataSelectService) {
  let query = kdDataSelectService.getDefaultResourceQuery($stateParams.namespace);
  return kdNetworkPolicyListResource.get(query).$promise;
}
