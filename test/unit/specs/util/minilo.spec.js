/* global describe, it, expect */
import * as lo from '@/util/minilo'

describe('minilo lib', () => {
  describe('isNumeric()', () => {
    it('should return true for number like values', () => {
      expect(lo.isNumeric(123)).to.be.true
      expect(lo.isNumeric(123.321)).to.be.true
      expect(lo.isNumeric('123')).to.be.true
      expect(lo.isNumeric('123.321')).to.be.true
    })

    it('should return false for non numeric values', () => {
      expect(lo.isNumeric('a123')).to.be.false
      expect(lo.isNumeric('123.321-abc')).to.be.false
    })
  })

  describe('isBoolean()', () => {
    it('should return true for boolean primitives', () => {
      expect(lo.isBoolean(true)).to.be.true
      expect(lo.isBoolean(false)).to.be.true
    })
    it('should return true for Boolean instances', () => {
      expect(lo.isBoolean(new Boolean(true))).to.be.true
      expect(lo.isBoolean(new Boolean(false))).to.be.true
    })
    it('should return false for non-boolean values', () => {
      expect(lo.isBoolean(1)).to.be.false
      expect(lo.isBoolean(0)).to.be.false
      expect(lo.isBoolean('')).to.be.false
      expect(lo.isBoolean([])).to.be.false
      expect(lo.isBoolean({})).to.be.false
    })
  })

  describe('isObjectLike()', () => {
    it('should return true for object values', () => {
      expect(lo.isObjectLike([])).to.be.true
      expect(lo.isObjectLike({})).to.be.true
      expect(lo.isObjectLike(new Object)).to.be.true
      expect(lo.isObjectLike(new Array)).to.be.true
    })
    it('should return false for primitives', () => {
      expect(lo.isObjectLike(0)).to.be.false
      expect(lo.isObjectLike('')).to.be.false
      expect(lo.isObjectLike(function () {})).to.be.false
    })
  })

  describe('isPlainObject()', () => {
    it('should return true only for plain objects', () => {
      expect(lo.isPlainObject({})).to.be.true
      expect(lo.isPlainObject(new Object)).to.be.true
    })
    it('should return false for all other values', () => {
      expect(lo.isPlainObject(0)).to.be.false
      expect(lo.isPlainObject('')).to.be.false
      expect(lo.isPlainObject(function () {})).to.be.false
      expect(lo.isPlainObject(new Array)).to.be.false
    })
  })

  describe('coalesce()', () => {
    it('should return first non-null value', () => {
      expect(lo.coalesce(undefined, null, 0)).to.be.equal(0)
      expect(lo.coalesce('qwe', null)).to.be.equal('qwe')
      expect(lo.coalesce()).to.be.undefined
    })
  })

  describe('plainProps()', () => {
    function Ctor () {}

    it('should clean the object from non-plain values', () => {
      const obj = {
        num: 123,
        str: 'qwe',
        arr: [1, 2, 3],
        func () {},
        inst: new Ctor(),
      }
      const expected = {
        num: 123,
        str: 'qwe',
        arr: [1, 2, 3],
      }

      expect(lo.plainProps(obj)).to.be.deep.equal(expected)
    })
  })

  describe('replaceTokens()', () => {
    it('should apply tokens replacement from hashmap', () => {
      const str = 'http://localhost/tiles/{z}/{x}/{y}.{format}?apiKey={apiKey}&mapId={mapId}'
      const replacement = {
        format: 'png',
        apiKey: 'my-super-secret-key',
        mapId: 'shik-map',
      }
      const expected = `http://localhost/tiles/{z}/{x}/{y}.${replacement.format}?apiKey=${replacement.apiKey}&mapId=${replacement.mapId}`

      expect(lo.replaceTokens(str, replacement)).to.be.equal(expected)
    })
  })

  describe('isEqual()', () => {
    it('should return true for equal value', () => {
      expect(lo.isEqual(123, 123)).to.be.true
      expect(lo.isEqual('123', '123')).to.be.true
      expect(lo.isEqual([1, 2, 3], [1, 2, 3])).to.be.true
      expect(lo.isEqual({q: 1, w: 2, e: 3}, {q: 1, w: 2, e: 3})).to.be.true
      expect(lo.isEqual(
        {q: 1, w: 2, e: 3, arr: [1, 2, 3], obj: {q: 'q', w: 'w', o: {}}},
        {q: 1, w: 2, e: 3, arr: [1, 2, 3], obj: {q: 'q', w: 'w', o: {}}}
      )).to.be.true
      expect(lo.isEqual(true, true)).to.be.true
    })
    it('should return false for non-equal values', () => {
      expect(lo.isEqual(123, '123')).to.be.false
      expect(lo.isEqual('123', '132')).to.be.false
      expect(lo.isEqual([1, 3, 4], [1, 2, 3])).to.be.false
      expect(lo.isEqual([1, 2, [2, 1]], [1, 2, [2, 2]])).to.be.false
      expect(lo.isEqual({q: 1, w: 2, e: 3}, {q: 1, w: 2, e: 3, r: 123})).to.be.false
      expect(lo.isEqual(
        {q: 1, w: 2, e: 3, arr: [1, 2, 3], obj: {q: 'q', w: 'w', o: [1, 2, 3]}},
        {q: 1, w: 2, e: 3, arr: [1, 2, 3], obj: {q: 'q', w: 'w', o: {}}}
      )).to.be.false
      expect(lo.isEqual(true, false)).to.be.false
    })
  })
})
