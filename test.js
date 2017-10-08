var AJV = require('ajv')
var assert = require('assert')
var semver = require('semver')

var ajv = new AJV({allErrors: true})
var data = require('./')

Object.keys(data).forEach(function (version) {
  var schema = data[version]
  assert.notEqual(
    semver.valid(version), null,
    version + ' invalid SemVer'
  )
  ajv.validateSchema(schema)
  assert.deepEqual(
    ajv.errors, null,
    version + ' invalid schema'
  )
  assert.equal(
    version, schema.properties.version.const,
    version + ' version mismatch'
  )
  assert(
    schema.required.includes('version'),
    version + ' version property not required'
  )
})
