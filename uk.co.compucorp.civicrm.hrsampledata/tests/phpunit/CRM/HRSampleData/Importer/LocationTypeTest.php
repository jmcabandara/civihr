<?php

require_once EXTENSION_ROOT_DIR . 'CRM/HRSampleData/Importer/LocationType.php';

/**
 * Class CRM_HRSampleData_Importer_LocationTypeTest
 *
 * @group headless
 */
class CRM_HRSampleData_Importer_LocationTypeTest extends CRM_HRSampleData_BaseImporterTest {

  public function setUp() {
    $this->rows = [];
    $this->rows[] = $this->importHeadersFixture();
  }

  public function testImport() {
    $this->rows[] = [
      'Correspondence',
      'Correspondence',
      'Correspondence',
      'Postal address',
      0,
      0,
      0
    ];

    $this->runImporter('CRM_HRSampleData_Importer_LocationType', $this->rows);

    $locationType = $this->apiGet('LocationType', ['name' => 'Correspondence']);

    foreach($this->rows[0] as $index => $fieldName) {
      $this->assertEquals($this->rows[1][$index], $locationType[$fieldName]);
    }
  }

  private function importHeadersFixture() {
    return [
      'name',
      'display_name',
      'vcard_name',
      'description',
      'is_reserved',
      'is_active',
      'is_default'
    ];
  }

}
