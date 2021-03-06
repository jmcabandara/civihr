<?php

use CRM_Contactaccessrights_BAO_Rights as ContactRights;
use CRM_Contactaccessrights_Test_Fabricator_Rights as RightsFabricator;
use CRM_HRCore_Test_Fabricator_OptionValue as OptionValueFabricator;
use CRM_Contactaccessrights_Utils_RightType_Location as LocationRightType;
use CRM_Contactaccessrights_Utils_RightType_Region as RegionRightType;
/**
 * Class CRM_Contactaccessrights_BAO_RightsTest
 *
 * @group headless
 */
class CRM_Contactaccessrights_BAO_RightsTest extends BaseHeadlessTest {

  private $regionEntityType = RegionRightType::TYPE;

  private $locationEntityType = LocationRightType::TYPE;

  private $contactRights;

  public function setUp() {
    CRM_Core_DAO::executeQuery('SET foreign_key_checks = 0;');
    $this->contactRights = new ContactRights();
  }

  public function testGetContactRightsByLocations() {
    $contact = ['id' => 5];

    // Create Regions and Locations
    $region1 = $this->createOptionValue($this->regionEntityType, 'Region 1');
    $location1 = $this->createOptionValue($this->locationEntityType, 'Location 1');
    $location2 = $this->createOptionValue($this->locationEntityType, 'Location 2');

    // Add Regions / Locations to contact's Rights
    $regionRights1 = $this->setContactRights($contact, $region1, $this->regionEntityType);
    $locationRights1 = $this->setContactRights($contact, $location1, $this->locationEntityType);
    $locationRights2 = $this->setContactRights($contact, $location2, $this->locationEntityType);

    $rights = $this->contactRights->getContactRightsByLocations($contact['id']);

    //contact has rights to two locations only.
    $this->assertCount(2, $rights);
    $expectedArray = [
      $locationRights1['id'] => [
        'id' => $locationRights1['id'],
        'contact_id' => $contact['id'],
        'entity_type' => $this->locationEntityType,
        'entity_id' => $location1['id'],
        'label' => $location1['label'],
        'value' => $location1['value']
      ],

      $locationRights2['id'] => [
        'id' => $locationRights2['id'],
        'contact_id' => $contact['id'],
        'entity_type' => $this->locationEntityType,
        'entity_id' => $location2['id'],
        'label' => $location2['label'],
        'value' => $location2['value']
      ]
    ];

    $this->assertEquals($expectedArray, $rights);
  }

  public function testGetContactRightsByRegions() {
    $contact = ['id' => 5];

    // Create Regions and Locations
    $region1 = $this->createOptionValue($this->regionEntityType, 'Region 1');
    $region2 = $this->createOptionValue($this->regionEntityType, 'Region 2');
    $location1 = $this->createOptionValue($this->locationEntityType, 'Location 1');

    // Add Regions / Locations to contact's Rights
    $regionRights1 = $this->setContactRights($contact, $region1, $this->regionEntityType);
    $regionRights2 = $this->setContactRights($contact, $region2, $this->regionEntityType);
    $locationRights1 = $this->setContactRights($contact, $location1, $this->locationEntityType);

    $rights = $this->contactRights->getContactRightsByRegions($contact['id']);

    //contact has rights to two regions only.
    $this->assertCount(2, $rights);
    $expectedArray = [
      $regionRights1['id'] => [
        'id' => $regionRights1['id'],
        'contact_id' => $contact['id'],
        'entity_type' => $this->regionEntityType,
        'entity_id' => $region1['id'],
        'label' => $region1['label'],
        'value' => $region1['value']
      ],

      $regionRights2['id'] => [
        'id' => $regionRights2['id'],
        'contact_id' => $contact['id'],
        'entity_type' => $this->regionEntityType,
        'entity_id' => $region2['id'],
        'label' => $region2['label'],
        'value' => $region2['value']
      ]
    ];

    $this->assertEquals($expectedArray, $rights);
  }

  public function testGetContactRightsByRegionsReturnsEmptyWhenContactHasNoRightsToAnyRegion() {
    $contact = ['id' => 5];

    $rights = $this->contactRights->getContactRightsByRegions($contact['id']);
    $this->assertEquals([], $rights);
  }

  public function testGetContactRightsByLocationsReturnsEmptyWhenContactHasNoRightsToAnyLocation() {
    $contact = ['id' => 5];

    $rights = $this->contactRights->getContactRightsByLocations($contact['id']);
    $this->assertEquals([], $rights);
  }

  private function setContactRights($contact, $entity, $entityType) {
    return RightsFabricator::fabricate([
      'contact_id' => $contact['id'],
      'entity_id' => $entity['id'],
      'entity_type' => $entityType
    ]);
  }

  private function createOptionValue($optionGroupName, $value) {
    $params = [
      'option_group_id' => $optionGroupName,
      'name' => $value,
      'label' => $value,
      'value' => $value
    ];

    return OptionValueFabricator::fabricate($params);
  }
}
