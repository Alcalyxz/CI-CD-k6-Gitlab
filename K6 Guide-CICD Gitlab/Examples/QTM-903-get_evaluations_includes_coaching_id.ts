/*
Script Name:  QTM-903-get_evaluation_includes_coaching_id.ts
Description: Scenarios for get a evaluation API with coaching IDs
Author: Yuri Restrepo
Data Preconditions Flow:
1. Create a new evaluation
2. Edit the evaluation with coachings IDs
*/

import faker from 'faker/locale/en_US'
import { expect } from 'chai'
import {
  CC_add_coaching_ids_evaluation,
  CC_Delete_Evaluation,
  CC_New_Evaluation,
} from '../../../../common/evaluations'
import { CC_api, CC_logout, clearCookies } from '../../../../common/general'
import { CC_delete_scorecard_via_api } from '../../../../common/scorecards'
import { CC_Delete_Team } from '../../../../common/teams'
import { Describe, It } from '../../../../lib/harness_definition'

interface DataSetup {
  /** Evaluation data. */
  evaluation_1: any
  evaluation_2: any
  coaching_id_1: string
  coaching_id_2: string
  coaching_id_3: string
  coaching_sequence_1: string
  coaching_sequence_2: string
  coaching_sequence_3: string
  coachings: any
}

export function getTags() {
  return ['@legacy', '@quantum', '@evaluations']
}

export function setup() {
  const coaching_id_1: string = 'coach' + faker.datatype.number()
  const coaching_id_2: string = 'coach' + faker.datatype.number()
  const coaching_id_3: string = 'coach' + faker.datatype.number()
  const coaching_sequence_1: string = String(faker.datatype.number(9999))
  const coaching_sequence_2: string = String(faker.datatype.number(9999))
  const coaching_sequence_3: string = String(faker.datatype.number(9999))
  const coachings: any = [
    { coaching_id: coaching_id_1, coaching_sequence: coaching_sequence_1 },
    { coaching_id: coaching_id_2, coaching_sequence: coaching_sequence_2 },
    { coaching_id: coaching_id_3, coaching_sequence: coaching_sequence_3 },
  ]
  const evaluation_1: any = CC_New_Evaluation('admin', 'active')
  const evaluation_2: any = CC_New_Evaluation('admin', 'active')
  return { evaluation_1, evaluation_2, coachings }
}

export default (data: DataSetup) => {
  Describe('QTM-903-GET /v1/evaluations/:evaluation_id - coachings ids', () => {
    It('QTM-903-Get an Evaluation with coaching IDs', function () {
      clearCookies()
      const edit_evaluation: any = CC_add_coaching_ids_evaluation(
        data.evaluation_1._id,
        data.coachings,
        'admin',
      )
      const api_url = '/v1/evaluations/'
      const res = CC_api(
        'GET',
        api_url,
        { scorecard_id: data.evaluation_1.scorecard_id },
        {},
        'admin',
      )
      const resp: any = res.json('result')
      expect(resp[0], 'Verify evaluation body').to.deep.equal(edit_evaluation)
      expect(resp[0].coaching, 'Verify evaluation coachings').to.deep.equal(data.coachings)
    })

    It('QTM-903Get an Evaluation with empty coaching IDs', function () {
      clearCookies()
      const edit_evaluation: any = CC_add_coaching_ids_evaluation(
        data.evaluation_2._id,
        [],
        'admin',
      )
      const api_url = '/v1/evaluations/'
      const res = CC_api(
        'GET',
        api_url,
        { scorecard_id: data.evaluation_2.scorecard_id },
        {},
        'admin',
      )
      const resp: any = res.json('result')
      expect(resp[0], 'Verify evaluation body').to.deep.equal(edit_evaluation)
      expect(resp[0].coaching, 'Verify evaluation coachings').to.deep.equal([])
    })
  })
}

export function teardown(data: DataSetup) {
  CC_logout()
  clearCookies()
  CC_Delete_Evaluation(data.evaluation_1._id, 'admin')
  CC_delete_scorecard_via_api(data.evaluation_1.scorecard_id)
  CC_Delete_Team(data.evaluation_1.team_id)
  CC_Delete_Evaluation(data.evaluation_2._id, 'admin')
  CC_delete_scorecard_via_api(data.evaluation_2.scorecard_id)
  CC_Delete_Team(data.evaluation_2.team_id)
}
